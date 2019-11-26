import Config from './config'

export const corsOptions = {
  origin: (origin, callback) => {
    if (Config.originsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by CORS'))
    }
  },
  credentials: true,
}
