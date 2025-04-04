import { Schema, Document } from 'mongoose';
import { User} from "src/users/schemas/user.schema";

export interface Truck extends Document {
  user: Schema.Types.ObjectId;
  year: string; 
  color: string;
  plates: string;
}


export const TruckSchema = new Schema<Truck>({
  user: { type: Schema.Types.ObjectId, ref: User.name, required: true }, 
  year: { type: String, required: true },
  color: { type: String, required: true },
  plates: { type: String, required: true },
}, { timestamps: true });