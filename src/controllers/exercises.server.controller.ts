import { Request, Response } from 'express'
import * as mongoose from 'mongoose'
import { Exercise } from '../models/exercise.model'
import { IWorkout, Workout } from '../models/workout.model'
import { IExercise } from './../models/exercise.model'

export default class ExercisesController {
  public getByWorkout(req: Request, res: Response, next: Function): void {
    const { workoutId } = req.params
    Workout.findOne({ _id: workoutId })
      .then(workout => {
        if (!workout) {
          res.status(404).json({ message: 'Workout not found' })
          return
        }
        Exercise.find({
          _id: {
            $in: [
              ...workout.exerciseIds.map(id => mongoose.Types.ObjectId(id)),
            ],
          },
          workoutId,
        })
          .then(exercises => res.status(200).json(exercises))
          .catch(error => next(error))
      })
      .catch(error => next(error))
  }

  public getByWorkoutAndExerciseId(
    req: Request,
    res: Response,
    next: Function
  ): void {
    const { workoutId, exerciseId } = req.params
    Workout.findOne({ _id: workoutId })
      .then(workout => {
        if (!workout) {
          res.status(404).json({ message: 'Workout not found' })
          return
        }
        Exercise.find({
          _id: exerciseId,
          workoutId,
        })
          .then(exercise => res.status(200).json(exercise))
          .catch(error => next(error))
      })
      .catch(error => next(error))
  }

  public create(req: Request, res: Response, next: Function): void {
    console.log('Called!!!')
    const { workoutId } = req.params
    Workout.findOne({ _id: workoutId })
      .then(workout => {
        if (!workout) {
          res.status(404).json({ message: 'Workout not found' })
          return
        }

        const userId = (req.user as any).sub
        if (workout.ownerId != (userId as string)) {
          res.status(400).json({ message: 'Invalid token' })
          return
        }

        const { name, description, sets, reps, time } = req.body
        const exercise = new Exercise({
          name,
          workoutId,
          description,
          sets,
          reps,
          time,
        })
        exercise
          .save()
          .then(e => {
            workout.exerciseIds.push(e._id)
            workout
              .save()
              .then(w => {
                res.status(201).json(e)
              })
              .catch(error => next(error))
          })
          .catch(error => next(error))
      })
      .catch(error => next(error))
  }

  public update(req: Request, res: Response, next: Function): void {
    const { workoutId, exerciseId } = req.params
    Workout.findOne({ _id: workoutId })
      .then(workout => {
        if (!workout) {
          res.status(404).json({ message: 'Workout not found' })
          return
        }

        const userId = (req.user as any).sub
        if (workout.ownerId != (userId as string)) {
          res.status(400).json({ message: 'Invalid token' })
          return
        }

        Exercise.findOne({ _id: exerciseId })
          .then(exercise => {
            if (!exercise) {
              res.status(404).json({ message: 'Exercise not found' })
              return
            }
            const { name, description, sets, reps, time } = req.body
            exercise.name = name
            exercise.description = description
            exercise.sets = sets
            exercise.reps = reps
            exercise.time = time

            exercise
              .save()
              .then(e => {
                res.status(200).json(e)
              })
              .catch(error => next(error))
          })
          .catch(error => next(error))
      })
      .catch(error => next(error))
  }
}

export const exercisesController = new ExercisesController()
