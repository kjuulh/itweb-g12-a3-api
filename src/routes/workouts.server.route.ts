import { Express } from 'express'
import { workoutsController } from '../controllers/workout.server.controller'

export default class WorkoutRoute {
  constructor(app: Express) {
    app
      .route('/workouts')
      .get(workoutsController.getAll)
      .post(workoutsController.create)
    app
      .route('/workouts/:workoutId')
      .get(workoutsController.getById)
      .put(workoutsController.update)
      .delete(workoutsController.delete)
  }
}
