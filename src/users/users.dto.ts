import { IsString, Length, IsEmail, IsNotEmpty, Matches, IsUUID, Validate, IsNotIn } from 'class-validator';
import { checkPassword } from 'src/decorators/checkPassword.decorator';


export class UserDto {
 @IsNotEmpty()
 @IsUUID()
id: string;

@IsNotIn([true], { message: 'isAdmin property is not allowed' })
 isAdmin?: boolean;

 @IsNotEmpty()
 @IsString()
 @Length(3, 80)
 name: string;

 @IsNotEmpty()
 @IsEmail()
 email: string;

 @IsNotEmpty()
 @Length(8, 15)
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
 })
 password: string;

 @IsNotEmpty()
 @Validate(checkPassword, ['password'])
 confirmPassword: string; // more efficient -- real time validation

 @IsNotEmpty()
 @IsString()
 @Length(3, 80)
 address: string;

 @IsNotEmpty()
 phone: number;

 @IsNotEmpty()
 @IsString()
 @Length(5, 20)
 country: string;

 @IsNotEmpty()
 @IsString()
 @Length(5, 20)
 city: string;
}
