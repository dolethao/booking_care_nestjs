import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialtyDocument = Specialty & Document;

@Schema({ timestamps: true })
export class Specialty {
  @Prop({ required: true })
  nameVi: string;

  @Prop({ required: true })
  nameEn: string;

  @Prop()
  descriptionHTML: string;

  @Prop()
  descriptionMarkdown: string;

  @Prop()
  image: string;
}

export const SpecialtySchema = SchemaFactory.createForClass(Specialty); 