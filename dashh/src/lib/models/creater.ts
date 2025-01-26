// lib/models/creator.ts
import mongoose, { Schema, Model } from 'mongoose';
import { ICreator } from '../interface/creater';

const CreatorSchema: Schema = new Schema({
  solAdd: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  icons: { type: String, required: true },
  users: { type: [String] },
end: { type: Date, required: true },
});

const Creator: Model<ICreator> = mongoose.models.Creator || mongoose.model<ICreator>('Creator', CreatorSchema);

export default Creator;