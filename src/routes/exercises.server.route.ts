import { Express } from 'express'
import { exercisesController } from '../controllers/exercises.server.controller'
import { workoutsController } from '../controllers/workout.server.controller'

export default class ExercisesRoute {
  constructor(app: Express) {
    app
      .route('/workouts/:workoutId/exercises')
      .get(exercisesController.createPage)
      .post(exercisesController.create)
  }
}
