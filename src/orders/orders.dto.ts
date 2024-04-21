import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class addOrderDto {
 @IsNotEmpty({ message: 'User ID is required.' })
 @IsString({ message: 'User ID must be a string.' })
 userId: string;

 @IsNotEmpty({ message: 'Product IDs are required.' })
 @IsArray({ message: 'Product IDs must be an array.' })
 @ArrayNotEmpty({ message: 'Product IDs array cannot be empty.' })
 @ArrayUnique({ message: 'Product IDs must be unique.' })
 productIds: string[];
}
