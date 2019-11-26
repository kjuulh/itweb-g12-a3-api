import { Document, Model, model, Schema } from 'mongoose'

export interface ILog extends Document {
  id: string
  ownerId: string
  exerciseId: string
  workoutId: string
  exerciseName: string
  content: string
  date: string
}

export let LogSchema: Schema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  ownerId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  exerciseId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  workoutId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  exerciseName: {
    required: true,
    type: Schema.Types.String,
  },
  content: {
    required: true,
    type: Schema.Types.String,
  },
  date: {
    required: true,
    type: Schema.Types.String,
  },
})

export const Log: Model<ILog> = model<ILog>('Log', LogSchema)
