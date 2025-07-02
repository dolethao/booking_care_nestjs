import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'patientId' })
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'doctorId' })
  doctorId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'description', required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'files', required: false })
  files?: string;
} 