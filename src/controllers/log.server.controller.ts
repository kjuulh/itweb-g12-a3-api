import { Request, Response } from 'express'
import { Log } from '../models/log.model'

export default class LogsController {
  public getByUser(req: Request, res: Response, next: Function) {
    const { userId } = req.params
    const authUserId = req.user['sub']

    if (userId != authUserId) {
      res.status(400).json({ message: 'Invalid token' })
      return
    }

    Log.find({ ownerId: userId })
      .then(logs => {
        res.json(logs)
      })
      .catch(err => next(err))
  }

  public getByWorkout(req: Request, res: Response, next: Function) {
    const { workoutId, userId } = req.params
    const authUserId = req.user['sub']

    if (userId != authUserId) {
      res.status(400).json({ message: 'Invalid token' })
      return
    }

    Log.find({ ownerId: userId, workoutId })
      .then(logs => {
        res.json(logs)
      })
      .catch(err => next(err))
  }

  public getByExercise(req: Request, res: Response, next: Function) {
    const { exerciseId, userId } = req.params
    const authUserId = req.user['sub']

    if (userId != authUserId) {
      res.status(400).json({ message: 'Invalid token' })
      return
    }

    Log.find({ ownerId: userId, exerciseId })
      .then(logs => {
        res.json(logs)
      })
      .catch(err => next(err))
  }

  public create(req: Request, res: Response, next: Function) {
    const { userId } = req.params
    const authUserId = req.user['sub']

    if (userId != authUserId) {
      res.status(400).json({ message: 'Invalid token' })
      return
    }
    new Log(req.body)
      .save()
      .then(log => {
        res.json(log)
      })
      .catch(err => next(err))
  }
}

export const logsController = new LogsController()
