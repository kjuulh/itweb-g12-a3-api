import * as bcrypt from 'bcrypt-nodejs';
import { Document, Model, model, Schema } from 'mongoose';

export interface Score {
  userId: string;
  session: string;
  score: number;
}

export interface IScore extends Document {
  userId: string;
  session: string;
  score: number;
}

export let ScoreSchema: Schema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  session: {
    required: true,
    type: Schema.Types.String,
  },
  score: {
    required: true,
    type: Schema.Types.Number,
  },
});

export const Score: Model<IScore> = model<IScore>('Score', ScoreSchema);
