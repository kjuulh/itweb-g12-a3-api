import * as http from 'http'
import expressConfig from './config/express.config'

const app = expressConfig()

// Configure server
const server: http.Server = new http.Server(app)

let port = process.env.PORT
if (port == null || port === '') {
  port = '8080'
}

// tslint:disable-next-line: radix
server.listen(parseInt(port))

server.on('error', (e: Error) => console.log('Error starting server: ' + e))

server.on('listening', () => {
  console.log(`Server started on port 8080 on env ${process.env.NODE_ENV}`)
})
