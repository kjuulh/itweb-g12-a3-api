import { Express } from 'express'
import passport = require('passport')
import { authController } from '../controllers/auth.server.controller'

export default class AuthRoutes {
  constructor(app: Express) {
    app.route('/authenticate').post(authController.authenticate)
    app.route('/register').post(authController.register)
  }
}
