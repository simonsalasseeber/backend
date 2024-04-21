import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
 @ApiProperty({
    description: 'The unique identifier of the product. Generated automatically.',
    example: '123e4567-e89b-12d3-a456-426614174000',
 })
 @IsOptional()
 id?: string;

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
    description: 'The category of the product.',
    example: 'Electronics',
 })
 @IsNotEmpty()
 @IsString()
 category: string;
}
