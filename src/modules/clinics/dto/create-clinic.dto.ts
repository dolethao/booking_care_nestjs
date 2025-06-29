import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  descriptionHTML?: string;

  @IsString()
  @IsOptional()
  descriptionMarkdown?: string;

  @IsString()
  @IsOptional()
  image?: string;
} 