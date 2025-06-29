import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule {
  @Prop()
  currentNumber: number;

  @Prop()
  maxNumber: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  timeType: string;

  @Prop({ required: true })
  doctorId: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule); 