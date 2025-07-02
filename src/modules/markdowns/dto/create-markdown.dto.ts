import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMarkdownDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'contentHTML', required: false })
  contentHTML?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'contentMarkdown', required: false })
  contentMarkdown?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'description', required: false })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'doctorId' })
  doctorId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'specialtyId', required: false })
  specialtyId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'clinicId', required: false })
  clinicId?: number;
} 