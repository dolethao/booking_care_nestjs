import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMarkdownDto {
  @IsString()
  @IsOptional()
  contentHTML?: string;

  @IsString()
  @IsOptional()
  contentMarkdown?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsOptional()
  specialtyId?: string;

  @IsString()
  @IsOptional()
  clinicId?: string;
} 