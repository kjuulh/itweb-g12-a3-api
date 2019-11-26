import * as express from 'express'
import * as path from 'path'
import config from './config'

export default (app: express.Express) => {
  for (const route of config.globFiles(config.routes)) {
    require(path.resolve(route)).default(app)
  }

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: (err: any) => void
    ): void => {
      const err: Error = new Error('Not Found')
      next(err)
    }
  )
}
