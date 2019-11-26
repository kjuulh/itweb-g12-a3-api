import bodyParser = require('body-parser')
import * as express from 'express'

export default (app: express.Express) => {
  app.use(bodyParser.json())
}
