import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'password' })
  password: string;
} 