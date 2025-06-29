import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  @IsOptional()
  currentNumber?: number;

  @IsNumber()
  @IsOptional()
  maxNumber?: number;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  timeType: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;
} 