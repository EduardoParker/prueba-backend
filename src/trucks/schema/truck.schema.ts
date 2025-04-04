import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Truck extends Document {
  user: mongoose.Types.ObjectId;
  year: string; 
  color: string;
  plates: string;
}


export const TruckSchema = new Schema<Truck>({
  user: { type: Schema.Types.ObjectId, ref: "User", required:true}, 
  year: { type: String, required: true },
  color: { type: String, required: true },
  plates: { type: String, required: true },
}, { timestamps: true });