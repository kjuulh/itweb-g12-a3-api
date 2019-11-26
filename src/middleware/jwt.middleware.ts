import * as jwt from 'express-jwt'
import * as pathToRegexp from 'path-to-regexp'
import Config from './../config/config'

const jwtMiddleware = () => {
  const secret = '123123123123123123123'
  return jwt({ secret }).unless({
    path: [
      { url: pathToRegexp('/authenticate'), methods: ['POST'] },
      { url: pathToRegexp('/register'), methods: ['POST'] },
      { url: pathToRegexp('/users'), methods: ['GET'] },
      { url: pathToRegexp('/workouts'), methods: ['GET'] },
      { url: pathToRegexp('/workouts/:workoutId'), methods: ['GET'] },
      { url: pathToRegexp('/users/id/:userId'), methods: ['GET'] },
      { url: pathToRegexp('/workouts/:workoutId/exercises'), methods: ['GET'] },
      {
        url: pathToRegexp('/workouts/:workoutId/exercises/exerciseId'),
        methods: ['GET'],
      },
      { url: pathToRegexp('*'), methods: ['OPTIONS'] },
    ],
  })
}

export default jwtMiddleware
