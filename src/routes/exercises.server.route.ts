import { Express } from 'express'
import { exercisesController } from '../controllers/exercises.server.controller'
import { workoutsController } from '../controllers/workout.server.controller'

export default class ExercisesRoute {
  constructor(app: Express) {
    app
      .route('/workouts/:workoutId/exercises')
      .post(exercisesController.create)
      .get(exercisesController.getByWorkout)
    app
      .route('/workouts/:workoutId/exercises/:exerciseId')
      .put(exercisesController.update)
      .get(exercisesController.getByWorkoutAndExerciseId)
  }
}
