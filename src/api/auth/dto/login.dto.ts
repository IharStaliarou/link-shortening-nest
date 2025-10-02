import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'Email of user',
    example: 'j.doe@example.com',
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Uncorrect email format' })
  email: string;

  @ApiProperty({
    description: 'Password of user account',
    example: 'Qvd5tmoE9e1_33',
    minLength: 8,
    maxLength: 128,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128, { message: 'Password must be less than 128 characters' })
  password: string;
}
