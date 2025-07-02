import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'nameVi' })
  nameVi: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'nameEn' })
  nameEn: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'descriptionHTML', required: false })
  descriptionHTML?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'descriptionMarkdown', required: false })
  descriptionMarkdown?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'image', required: false })
  image?: string;
} 