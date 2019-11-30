import * as bcrypt from 'bcrypt-nodejs';
import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  created: Date;
  generateHash(password: string): string;
  validateHash(password: string): boolean;
}

export let UserSchema: Schema = new Schema({
  username: {
    required: true,
    unique: true,
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
});

UserSchema.methods.generateHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validateHash = function(password: string) {
  try {
    console.log(password);
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    return false;
  }
};

export const User: Model<IUser> = model<IUser>('User', UserSchema);
