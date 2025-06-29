import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  statusId: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  timeType: string;

  @IsString()
  @IsOptional()
  token?: string;
} 