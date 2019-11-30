import { sync } from 'glob';
import { union } from 'lodash';

export default class Config {
  public static port: number = 3000;
  public static routes: string = './dist/routes/**/*.js';
  public static models: string = './dist/models/**/*.js';
  public static useMongo: boolean = true;
  public static mongodb =
    process.env.NODE_ENV === 'remote'
      ? process.env.DATABASE_URL
      : 'mongodb://localhost:27017/express';

  public static secret =
    process.env.NODE_ENV !== 'remote' ? '{"secret": "abc123"}' : '';

  public static originsWhitelist = [
    'http://localhost:3000',
    'http://localhost:4200',
    'https://itweb-g12-a2-app.herokuapp.com',
    'https://itweb-g12-a2-app.herokuapp.com/',
    'https://itweb-g12-a2-api.herokuapp.com',
  ];

  public static globFiles(location: string): string[] {
    return union([], sync(location));
  }
}
