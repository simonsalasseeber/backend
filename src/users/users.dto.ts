import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Matches, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password must contain at least one lower case, one upper case, a number and one of the following special characters: @$!%*?&' })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one lower case, one upper case, a number and one of the following special characters: @$!%*?&',
  })
  password: string;

  @ApiProperty({ description: 'The confirmed password of the user' })
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({ description: 'The country of the user' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'The address of the user' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'The city of the user' })
  @IsNotEmpty()
  @IsString()
  city: string;
}
