import { ApiProperty } from '@nestjs/swagger';
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
 @ApiProperty({
   description: "The name of the user"
 })
 name: string;

 @IsNotEmpty()
 @IsEmail()
 /**
  * must be a string in the classic email format
  * @example 'simon_coder@gmail.com'

 */
 email: string;

 @IsNotEmpty()
 @Length(8, 15)
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
 })
 @ApiProperty({
   description: "The password of the user"
 })
 password: string;

 @IsNotEmpty()
 @Validate(checkPassword, ['password'])
 @ApiProperty({
   description: "The confirmed password of the user"
 })
 confirmPassword: string; // more efficient -- real time validation

 @IsNotEmpty()
 @IsString()
 @Length(3, 80)
 @ApiProperty({
   description: "The adress of the user"
 })
 address: string;

 @IsNotEmpty()
 @ApiProperty({
   description: "The phne of the user"
 })
 phone: number;

 @IsNotEmpty()
 @IsString()
 @Length(5, 20)
 @ApiProperty({
   description: "The country of the user"
 })
 country: string;

 @IsNotEmpty()
 @IsString()
 @Length(5, 20)
 @ApiProperty({
   description: "The city of the user"
 })
 city: string;
}
