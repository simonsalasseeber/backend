import { Body, Controller, Delete, Get, Param, Query, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { CreateProductDto } from './products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
    @ApiQuery({name: 'page', required: false})
    @ApiQuery({name: 'limit', required: false})
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        page = page || 1;
        limit = limit || 5;
        return this.productsService.getProducts(page, limit);
    }
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }
    @Post()
    addProduct(@Body() createProductDto: CreateProductDto){
        return this.productsService.addProduct(createProductDto);
    }
    @Post('seeder')
    addProductSeeder(){
        return this.productsService.addProductSeeder();
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id') id:string, @Body() product: any) {
        return this.productsService.updateProduct(id, product)
    }

    @ApiBearerAuth()
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
