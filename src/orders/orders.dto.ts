import { IsString, Length, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class OrdersDto {
 @IsNotEmpty()
 @IsEmail()
 email: string;

 @IsNotEmpty()
 @Length(8, 15)
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
 })
 password: string;

}
