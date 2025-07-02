import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateDoctorDto {
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

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'priceId', required: false })
  priceId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'provinceId', required: false })
  provinceId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'paymentId', required: false })
  paymentId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'addressClinic', required: false })
  addressClinic?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'nameCilinic', required: false })
  nameCilinic?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'note', required: false })
  note?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'count', required: false })
  count?: number;
} 