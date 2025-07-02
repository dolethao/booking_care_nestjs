import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'firstName' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'lastName' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'address', required: false })
  address?: string;

  @IsString()
  @IsOptional() 
  @ApiProperty({ description: 'phoneNumber', required: false })
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'gender', required: false })
  gender?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'image', required: false })
  image?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'roleId', required: false })
  roleId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'positionId', required: false })
  positionId?: number;
} 