import { Document, Model, model, Schema } from 'mongoose'

export interface IWorkout extends Document {
  id: string
  ownerId: string
  name: string
  description: string
  exerciseIds: string[]
  created: Date
}

export let WorkoutSchema: Schema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  ownerId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    required: true,
    type: Schema.Types.String,
    minlength: 1,
  },
  description: {
    type: Schema.Types.String,
  },
  exerciseIds: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const Workout: Model<IWorkout> = model<IWorkout>(
  'Workout',
  WorkoutSchema
)
