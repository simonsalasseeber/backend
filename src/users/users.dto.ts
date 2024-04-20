import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Matches, IsNumber, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: @$!%*?&',
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
