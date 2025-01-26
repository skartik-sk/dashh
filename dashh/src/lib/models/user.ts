// lib/models/User.ts
import mongoose, { Schema, Model } from 'mongoose';

import { IUser } from '../interface/user';

const UserSchema: Schema = new Schema({

  solAdd: { type: String, required: true },
  post: { type: String, required: true },
  isAwarded: { type: Boolean, required: true,default:false },
  igProfile: { type: String,  },
  views: { type: Number, default: 0 },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;