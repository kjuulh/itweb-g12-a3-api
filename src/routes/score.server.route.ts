import { Express } from 'express';
import { scoreController } from '../controllers/score.server.controller';

export default class ScoreRoutes {
  constructor(app: Express) {
    app.route('/scores/:records').get(scoreController.get);
  }
}
