import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  statusId: string;

  @Prop({ required: true })
  doctorId: string;

  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  timeType: string;

  @Prop()
  token: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking); 