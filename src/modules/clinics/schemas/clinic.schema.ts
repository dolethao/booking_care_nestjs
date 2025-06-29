import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClinicDocument = Clinic & Document;

@Schema({ timestamps: true })
export class Clinic {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  descriptionHTML: string;

  @Prop()
  descriptionMarkdown: string;

  @Prop()
  image: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic); 