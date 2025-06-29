import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  doctorId: string;

  @Prop()
  specialtyId: string;

  @Prop()
  clinicId: string;

  @Prop()
  priceId: string;

  @Prop()
  provinceId: string;

  @Prop()
  paymentId: string;

  @Prop()
  addressClinic: string;

  @Prop()
  nameCilinic: string;

  @Prop()
  note: string;

  @Prop()
  count: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor); 