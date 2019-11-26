import { Request, Response } from 'express'
import { Exercise } from '../models/exercise.model'
import { IWorkout, Workout } from '../models/workout.model'

export default class ExercisesController {
  public createPage(req: Request, res: Response, next: Function): void {
    Workout.findOne({ _id: req.params.workoutId }, (err, workout: IWorkout) => {
      if (err) {
        console.error('Invalid workout')
      } else {
        res.render('createExercise', {
          title: 'Create Exercise',
          workout,
        })
      }
    })
  }

  public create(req: Request, res: Response, next: Function): void {
    Workout.findOne({ _id: req.params.workoutId }, (err, workout: IWorkout) => {
      if (err) {
        console.error('Invalid workout')
      } else {
        const userId = req.user['_id']
        const workoutOwnerId = workout.ownerId
        if (!userId.equals(workoutOwnerId)) {
          res.redirect('/workouts')
        }

        const exercise = new Exercise({
          workoutId: workout._id,
          name: req.body.name,
          description: req.body.description,
          sets: req.body.sets,
        })
        if (req.body.repsOrTime === 'time') {
          exercise.time = req.body.repsTime
        } else {
          exercise.reps = req.body.repsTime
        }
        exercise.save(err => {
          if (err) {
            console.error(err)
          } else {
            workout.exerciseIds.push(exercise._id)
            workout.save(err => {
              if (err) {
                console.error(err)
              } else {
                res.redirect('/workouts/' + workout._id)
              }
            })
          }
        })
      }
    })
  }
}

export const exercisesController = new ExercisesController()
