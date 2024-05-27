import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateProductDto {

 @ApiProperty({
    description: 'The name of the product.',
    example: 'Example Product',
 })
 @IsNotEmpty()
 @IsString()
 name: string;

 @ApiProperty({
    description: 'The detailed description of the product.',
    example: 'This is an example product with a detailed description.',
 })
 @IsNotEmpty()
 @IsString()
 description: string;

 @ApiProperty({
    description: 'The price of the product.',
    example: 99.99,
 })
 @IsNotEmpty()
 @IsNumber()
 price: number;

 @ApiProperty({
    description: 'The available stock quantity of the product.',
    example: 10,
 })
 @IsNotEmpty()
 @IsNumber()
 stock: number;

 @ApiProperty({
    description: 'The URL of the product image.',
    example: 'default-image-url.jpg',
 })
 @IsNotEmpty()
 @IsString()
 imgUrl: string;

 @ApiProperty({
    description: 'The ID of the category of the product.',
    example: '0edb105b-a90b-43d6-a980-47283d29339d',
 })
 @IsNotEmpty()
 @IsString()
 @IsUUID()
 category: string;
}
