import { Document, Model, model, Schema } from 'mongoose'

export interface IExercise extends Document {
  id: string
  workoutId: string
  name: string
  description: string
  sets: number
  reps: number
  time: number
  created: Date
}

export let ExerciseSchema: Schema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  workoutId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Workout',
  },
  name: {
    required: true,
    type: Schema.Types.String,
    minlength: 1,
  },
  description: {
    type: Schema.Types.String,
  },
  sets: {
    required: true,
    type: Schema.Types.Number,
    min: 1,
  },
  reps: {
    type: Schema.Types.Number,
    min: 1,
  },
  time: {
    type: Schema.Types.Number,
    min: 1,
  },
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const Exercise: Model<IExercise> = model<IExercise>(
  'Exercise',
  ExerciseSchema
)
