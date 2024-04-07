import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }
    @Post()
    addProduct(@Body() product: any){
        return this.productsService.addProduct(product);
    }
    // @Put(':id')
    // updateProduct(@Param('id') id:string, @Body() product: any) {

    // }
    // @Delete()
    // deleteProduct(@Param('id') id: string) {
        
    // }
}
