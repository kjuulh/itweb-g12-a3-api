import * as bcrypt from 'bcrypt-nodejs'
import { Document, Model, model, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  created: Date
  generateHash(password: string): string
  validateHash(password: string): boolean
}

export let UserSchema: Schema = new Schema({
  firstName: {
    required: true,
    type: Schema.Types.String,
  },
  lastName: {
    required: true,
    type: Schema.Types.String,
  },
  email: {
    required: true,
    unique: true,
    type: Schema.Types.String,
  },
  password: {
    required: true,
    type: Schema.Types.String,
  },
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

UserSchema.methods.generateHash = function(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

UserSchema.methods.validateHash = function(password: string) {
  try {
    return bcrypt.compareSync(password, this.password)
  } catch (error) {
    console.log(error)
    return false
  }
}

export const User: Model<IUser> = model<IUser>('User', UserSchema)
