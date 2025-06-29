import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  phonenumber: string;

  @Prop()
  gender: string;

  @Prop()
  image: string;

  @Prop()
  roleId: string;

  @Prop()
  positionId: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 