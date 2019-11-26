import { Express } from 'express'
import { workoutsController } from '../controllers/workout.server.controller'

export default class WorkoutRoute {
  constructor(app: Express) {
    app.route('/workouts').post(workoutsController.createWorkout)
    app
      .route('/workouts/:workoutId')
      .get(workoutsController.getWorkout)
      .put(workoutsController.changeWorkout)
  }
}
