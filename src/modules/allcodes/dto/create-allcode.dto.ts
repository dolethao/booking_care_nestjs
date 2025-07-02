import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAllcodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'keyMap' })
  keyMap: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'type' })
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'valueEn', required: false })
  valueEn?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'valueVi', required: false })
  valueVi?: string;
} 