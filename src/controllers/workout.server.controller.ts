import { Request, Response } from 'express'
import { Mongoose } from 'mongoose'
import { Exercise, IExercise } from '../models/exercise.model'
import { IWorkout, Workout } from '../models/workout.model'

export default class WorkoutsController {
  public createWorkout(req: Request, res: Response, next: Function): void {
    const workout = new Workout({
      ownerId: req.user['_id'],
      name: req.body.name,
      description: req.body.description,
    })
    workout.save(err => {})
    console.info('Workout Created')
  }

  public changeWorkout(req: Request, res: Response, next: Function): void {
    console.info('Changing workout')

    Workout.findById(req.params.workoutId, (err, workout: IWorkout) => {
      const userId = req.user['_id']
      const workoutOwnerId = workout.ownerId
      if (!userId.equals(workoutOwnerId)) {
        console.log("User doesn't have permission")
        res.redirect('/home')
      }
      if (err) {
        console.error(err)
        res.redirect('/workouts/' + req.params.workoutId)
        return
      }
      workout.name = req.body.name
      workout.description = req.body.description
      workout.save(err => {
        if (err) {
          console.error(err)
          console.log('An error occurred saving workout')
          res.redirect('/workouts/' + req.params.workoutId)
          return
        }
        res.redirect('/workouts/mine')
      })
    })

    console.info('Workout Created')
  }

  public getWorkout(req: Request, res: Response, next: Function): void {
    Workout.findOne({ _id: req.params.workoutId }).exec(
      (err, workout: IWorkout) => {
        if (err) {
          console.error(err)
          res.redirect('/workouts')
          return
        }
        Exercise.find({ workoutId: workout._id }, (err, exercises) => {
          if (err) {
            console.error("Couldn't get exercises")
          } else {
            if (req.isAuthenticated()) {
              const userId = req.user['_id']
              const workoutOwnerId = workout.ownerId
              if (userId.equals(workoutOwnerId)) {
                res.render('editWorkout', {
                  title: 'Edit Workout: ' + workout.name,
                  workout,
                  exercises,
                  loggedIn: true,
                })
                return
              } else {
                res.render('workout', {
                  title: 'Workout: ' + workout.name,
                  workout,
                  exercises,
                  loggedIn: true,
                })
              }
            }
            res.render('workout', {
              title: 'Workout: ' + workout.name,
              workout,
              exercises,
              loggedIn: false,
            })
          }
        })
      }
    )
  }
}

export const workoutsController = new WorkoutsController()
