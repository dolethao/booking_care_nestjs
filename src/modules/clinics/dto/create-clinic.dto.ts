import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'address' })
  address: string;

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