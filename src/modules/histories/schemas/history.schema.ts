import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ timestamps: true })
export class History {
  @Prop({ required: true })
  patienId: string;

  @Prop({ required: true })
  doctorId: string;

  @Prop()
  description: string;

  @Prop()
  files: string;
}

export const HistorySchema = SchemaFactory.createForClass(History); 