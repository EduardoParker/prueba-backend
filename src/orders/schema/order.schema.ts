import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Order extends Document {
  user: mongoose.Types.ObjectId;
  truck: mongoose.Types.ObjectId;
  status: 'created' | 'in transit' | 'completed';
  pickup: mongoose.Types.ObjectId;
  dropoff: mongoose.Types.ObjectId;
}


export const OrderSchema = new Schema<Order>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  status: {
    type: String,
    enum: ['created', 'in transit', 'completed'],
    default: 'created',
    required: true,
  },
  pickup: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  dropoff: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
}, { timestamps: true });