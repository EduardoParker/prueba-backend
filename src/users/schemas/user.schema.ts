import { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  _id:ObjectId 
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});