import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'currentNumber', required: false })
  currentNumber?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'maxNumber', required: false })
  maxNumber?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'date' })
  date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'timeType' })
  timeType: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'doctorId' })
  doctorId: number;
} 