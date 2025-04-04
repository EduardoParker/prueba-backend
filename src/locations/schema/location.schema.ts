import { Schema, Document } from 'mongoose';

export interface Location extends Document {
  place_id: string;
  address: string;
  latitude: number;
  longitude: number;
}


export const LocationSchema = new Schema<Location>({
  place_id: { type: String, required: true },
  address: { type: String, required: true, unique:true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { timestamps: true });