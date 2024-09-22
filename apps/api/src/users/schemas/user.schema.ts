import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({
  versionKey: false,
  collection: 'users',
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id.toString(); // Convert MongoDB's _id to id
      delete ret._id; // Remove _id field from the JSON response
    },
  },
})
export class UserModel {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
