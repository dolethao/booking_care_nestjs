import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsOptional()
  specialtyId?: string;

  @IsString()
  @IsOptional()
  clinicId?: string;

  @IsString()
  @IsOptional()
  priceId?: string;

  @IsString()
  @IsOptional()
  provinceId?: string;

  @IsString()
  @IsOptional()
  paymentId?: string;

  @IsString()
  @IsOptional()
  addressClinic?: string;

  @IsString()
  @IsOptional()
  nameCilinic?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNumber()
  @IsOptional()
  count?: number;
} 