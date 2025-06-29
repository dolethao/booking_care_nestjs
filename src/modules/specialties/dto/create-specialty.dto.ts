import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  @IsNotEmpty()
  nameVi: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

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