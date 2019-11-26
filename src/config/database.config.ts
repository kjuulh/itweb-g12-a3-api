import * as express from 'express'
import * as mongoose from 'mongoose'
import * as path from 'path'
import config from './config'

export default (app: express.Express) => {
  for (const model of config.globFiles(config.models)) {
    require(path.resolve(model))
  }

  if (config.useMongo) {
    mongoose
      .connect(config.mongodb, {
        dbName: 'itweb-g12-a2',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(err => console.log('Error connecting to mongo' + err))
  }
}
