import { Request, Response } from 'express'
import e = require('express')
import { Mongoose } from 'mongoose'
import { Exercise, IExercise } from '../models/exercise.model'
import { IWorkout, Workout } from '../models/workout.model'

export default class WorkoutsController {
  public getAll(req: Request, res: Response, next: Function): void {
    Workout.find()
      .then(workouts => res.json(workouts))
      .catch(err => next(err))
  }

  public getById(req: Request, res: Response, next: Function): void {
    const { workoutId } = req.params
    Workout.findOne({ _id: workoutId })
      .then(workout => res.json(workout))
      .catch(err => next(err))
  }

  public create(req: Request, res: Response, next: Function): void {
    const { name, description } = req.body
    const userId = (req.user as any).sub

    const workout = new Workout({
      name,
      description,
      ownerId: userId,
    })
      .save()
      .then(w => res.json(w))
      .catch(err => next(err))
  }

  public update(req: Request, res: Response, next: Function): void {
    const { name, description, _id } = req.body
    const { workoutId } = req.params
    const userId = (req.user as any).sub

    if (_id !== workoutId) {
      res.status(400).json({ message: 'Invalid workout id' })
      return
    }

    Workout.findOne({ _id: workoutId })
      .then(workout => {
        if (userId != workout.ownerId) {
          res.status(401).json({ message: 'Invalid resource' })
        } else {
          workout.name = name
          workout.description = description
          workout
            .save()
            .then(w => res.json(w))
            .catch(err => next(err))
        }
      })
      .catch(err => next(err))
  }

  public delete(req: Request, res: Response, next: Function): void {
    const { workoutId } = req.params
    const userId = (req.user as any).sub

    Workout.findOne({ _id: workoutId })
      .then(w => {
        if (w == null) {
          res.status(404).json({ message: 'Resource not found' })
        }
        if (w.ownerId !== (userId as string)) {
          res.status(401).json({ message: 'Invalid resource' })
        } else {
          Workout.deleteOne({ _id: w._id })
            .then(ok => res.status(204).json({ message: 'ok' }))
            .catch(err => next(err))
        }
      })
      .catch(err => next(err))
  }

  /*
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
  */
}

export const workoutsController = new WorkoutsController()
