import { Body, Controller, Delete, Get, Param, Query, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
    @UseGuards()
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        page = page || 1;
        limit = limit || 5;
        return this.productsService.getProducts(page, limit);
    }
    @Get(':id')
    @UseGuards()
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }
    @Post()
    addProduct(@Body() product: any){
        return this.productsService.addProduct(product);
    }
    @Put(':id')
    updateProduct(@Param('id') id:string, @Body() product: any) {
        return this.productsService.updateProduct(id, product)
    }
    @Delete()
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
