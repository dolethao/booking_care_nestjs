import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'statusId' })
  statusId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'doctorId' })
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'patientId' })
  patientId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'date' })
  date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'timeType' })
  timeType: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'token', required: false })
  token?: string;
} 