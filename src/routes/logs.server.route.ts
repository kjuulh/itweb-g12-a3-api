import { Express } from 'express'
import { logsController } from './../controllers/log.server.controller'

export default class WorkoutRoute {
  constructor(app: Express) {
    app
      .route('/logs/users/:userId')
      .get(logsController.getByUser)
      .post(logsController.create)
    app
      .route('/logs/workouts/:workoutId/users/:userId')
      .get(logsController.getByWorkout)
    app
      .route('/logs/exerciseId/:exerciseId/users/:userId')
      .get(logsController.getByExercise)
  }
}
