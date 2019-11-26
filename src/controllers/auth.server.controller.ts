import { Request, Response } from 'express'
import { sign as jwtSign } from 'jsonwebtoken'
import passport = require('passport')
import { User } from '../models/user.model'

export default class AuthenticationController {
  public getAll(req: Request, res: Response, next: Function): void {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(err => next(err))
  }

  public getById(req: Request, res: Response, next: Function): void {
    User.findOne({ _id: req.params.userId })
      .then(user => res.status(200).json(user))
      .catch(err => next(err))
  }

  public authenticate(req: Request, res: Response, next: Function): void {
    const secret = '123123123123123123123'
    const { email, password } = req.body

    User.findOne({ email })
      .then(user => {
        if (user.validateHash(password)) {
          const token = jwtSign({ sub: user._id }, secret)
          res.status(200).json({ id: user._id, token })
        } else {
          res.status(400).json({ status: 'incorrect email or password' })
        }
      })
      .catch(err => next(err))
  }

  public register(req: Request, res: Response, next: Function): void {
    const user = new User(req.body)

    User.find({ email: user.email })
      .then(exists => {
        if (exists.length > 0) {
          console.log(exists)
          res.status(400).json({ status: 'User already exists' })
        } else {
          user.password = user.generateHash(user.password)
          try {
            user
              .save()
              .then(user => {
                res.status(201).json({
                  id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                })
              })
              .catch(error => res.status(400).send(error))
          } catch (error) {
            res.status(500).json({ status: error })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

export const authController = new AuthenticationController()
