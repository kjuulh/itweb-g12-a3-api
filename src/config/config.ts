import { sync } from 'glob'
import { union } from 'lodash'

export default class Config {
  public static port: number = 3000
  public static routes: string = './dist/routes/**/*.js'
  public static models: string = './dist/models/**/*.js'
  public static useMongo: boolean = true
  public static mongodb =
    process.env.NODE_ENV === 'remote'
      ? 'mongodb+srv://hermansenadmin:Blizzar1@itweb-g12-cbwzt.gcp.mongodb.net/itweb-g12'
      : 'mongodb://localhost:27017/express'

  public static globFiles(location: string): string[] {
    return union([], sync(location))
  }
}
