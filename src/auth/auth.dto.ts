import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class logindto {
 @IsNotEmpty()
 @IsEmail()
 @ApiProperty({
   description: "Enter the registered email",
   required: true
 })
 email: string;

 @IsNotEmpty()
 @Length(8, 15)
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
 })
 @ApiProperty({
   description: "Enter the registered password",
   required: true
 })
 password: string;
}
