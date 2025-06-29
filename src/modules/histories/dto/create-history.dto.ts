import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  @IsNotEmpty()
  patienId: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  files?: string;
} 