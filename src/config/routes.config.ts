import * as express from 'express'
import * as path from 'path'
import errorHandler from '../middleware/error.handler.middleware'
import jwtMiddleware from '../middleware/jwt.middleware'
import config from './config'

export default (app: express.Express) => {
  app.use(jwtMiddleware())
  for (const route of config.globFiles(config.routes)) {
    require(path.resolve(route)).default(app)
  }

  app.use(errorHandler)
}
