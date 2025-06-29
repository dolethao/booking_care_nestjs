import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarkdownDocument = Markdown & Document;

@Schema({ timestamps: true })
export class Markdown {
  @Prop()
  contentHTML: string;

  @Prop()
  contentMarkdown: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  doctorId: string;

  @Prop()
  specialtyId: string;

  @Prop()
  clinicId: string;
}

export const MarkdownSchema = SchemaFactory.createForClass(Markdown); 