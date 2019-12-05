import Config from 'config/config';
import ScoreController, {
  scoreController,
} from './controllers/score.server.controller';
import * as http from 'http';
import { verify as jwtVerify } from 'jsonwebtoken';
import * as SocketIo from 'socket.io';
import expressConfig from './config/express.config';

const app = expressConfig();

// Configure server
const server: http.Server = new http.Server(app);

let port = process.env.PORT;
if (port == null || port === '') {
  port = '8080';
}

// tslint:disable-next-line: radix
server.listen(parseInt(port));

const io = SocketIo(server);

io.on('connection', (socket: any) => {
  socket.on(
    'add-score',
    (payload: { jwt: string; score: number; session: string }) => {
      const decodedToken = jwtVerify(payload.jwt, process.env.PASSWORD_SECRET);

      if (decodedToken) {
        const userId = (decodedToken as { sub: string }).sub;

        ScoreController.addScoreHelper(
          {
            userId,
            session: payload.session,
            score: payload.score,
          },
          (err, record) => {
            if (err) {
              socket.emit('add-score-error');
            } else {
              io.sockets.emit('score-updated', record);
            }
          },
        );
      }
    },
  );
});

server.on('error', (e: Error) => console.log('Error starting server: ' + e));

server.on('listening', () => {
  console.log(`Server started on port 8080 on env ${process.env.NODE_ENV}`);
});
