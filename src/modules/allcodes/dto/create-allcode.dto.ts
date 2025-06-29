import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAllcodeDto {
  @IsString()
  @IsNotEmpty()
  keyMap: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  valueEn?: string;

  @IsString()
  @IsOptional()
  valueVi?: string;
} 