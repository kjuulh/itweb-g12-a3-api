import { Express } from 'express'
import passport = require('passport')
import { authController } from '../controllers/auth.server.controller'
import * as cors from 'cors'
import { corsOptions } from './../config/cors.constants'

export default class AuthRoutes {
  constructor(app: Express) {
    app.route('/authenticate').post(authController.authenticate)
    app.route('/register').post(authController.register)
    app.route('/users').get(authController.getAll)
    app.route('/users/id/:userId').get(authController.getById)
  }
}
