import { Request, Response } from 'express'
import passport = require('passport')
import { User } from '../models/user.model'

export default class AuthenticationController {
  public authenticate(req: Request, res: Response, next: Function): void {
    const { email, password } = req.body

    User.findOne({ email })
      .then(user =>
        user.validateHash(password)
          ? res.status(200).json({ status: 'ok' })
          : res.status(400).json({ status: 'wrong password' })
      )
      .catch(err => res.status(404).json(err))
  }

  public register(req: Request, res: Response, next: Function): void {
    const user = new User(req.body)

    User.find({ email: user.email }).then(user =>
      res.status(404).json({ status: 'User already exists' })
    )

    user.password = user.generateHash(user.password)
    try {
      user
        .save()
        .then(user => {
          res.status(201).send(user)
        })
        .catch(error => res.status(400).send(error))
    } catch (error) {
      res.status(500).json({ status: error })
    }
  }
}

export const authController = new AuthenticationController()
