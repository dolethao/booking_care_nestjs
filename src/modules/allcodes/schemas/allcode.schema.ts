import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AllcodeDocument = Allcode & Document;

@Schema({ timestamps: true })
export class Allcode {
  @Prop({ required: true })
  keyMap: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  valueEn: string;

  @Prop()
  valueVi: string;
}

export const AllcodeSchema = SchemaFactory.createForClass(Allcode); 