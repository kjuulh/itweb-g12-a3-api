import * as cors from 'cors'
import * as express from 'express'
import { corsOptions } from './cors.constants'
import databaseConfig from './database.config'
import parserConfig from './parser.config'
import routesConfig from './routes.config'

export default function() {
  const app: express.Express = express()

  app.use(cors(corsOptions))

  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    )

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200)
    } else {
      next()
    }
  }

  app.use(allowCrossDomain)

  app.options('*', cors())

  databaseConfig(app)
  parserConfig(app)
  routesConfig(app)

  return app
}
