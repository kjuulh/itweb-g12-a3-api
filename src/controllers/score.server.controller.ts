import { Request, Response } from 'express';
import { Score, IScore } from '../models/score.model';
import { User, IUser } from '../models/user.model';

export default class ScoreController {
  public static getScoresHelper(records: number, cb: (err, records) => void) {
    Score.find()
      .sort({ score: -1 })
      .limit(records as number)
      .exec((err, docs) => {
        cb(err, docs);
      });
  }

  public static addScoreHelper(
    record: Score,
    cb: (err: any, record: Score) => void,
  ) {
    Score.findOne({ session: record.session }).then((score) => {
      if (score) {
        // update
        score.score = record.score;
        score
          .save()
          .then((res) => cb(null, res))
          .catch((error) => cb(error, null));
      } else {
        const score = new Score(record);
        score
          .save()
          .then((res) => cb(null, res))
          .catch((error) => cb(error, null));
      }
    });
  }

  public get(req: Request, res: Response, next: Function): void {
    const { records } = req.params;

    ScoreController.getScoresHelper(
      Number.parseInt(records),
      (err, scores: IScore[]) => {
        if (err) {
          next(err);
        } else {
          const userIds: string[] = [];

          scores.forEach((score) => {
            userIds.push(score.userId);
          });

          // Get Distinct
          const uUserIds = userIds.filter(
            (value, index, self) => self.indexOf(value) === index,
          );

          User.where('_id')
            .in(uUserIds)
            .exec((err, users: IUser[]) => {
              if (err) {
                next(err);
              } else {
                const response: Array<{ username: string; score: number }> = [];

                scores.forEach((score) => {
                  users.forEach((user) => {
                    if (score.userId == user.id) {
                      response.push({
                        username: user.username,
                        score: score.score,
                      });
                    }
                  });
                });

                res.json(response);
              }
            });
        }
      },
    );
  }
}

export const scoreController = new ScoreController();
