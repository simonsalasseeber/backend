import { Body, Controller, Delete, Get, Param, Query, Post, Put, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { CreateProductDto } from './products.dto';
import { Product } from 'src/entities/products.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiQuery({name: 'page', required: false})
    @ApiQuery({name: 'limit', required: false})
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        page = page || 1;
        limit = limit || 5;
        return this.productsService.getProducts(page, limit);
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get products by ID' })
    getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.productsService.getProductById(id);
    }
    @Post()
    @ApiOperation({ summary: 'Add products' })
    addProduct(@Body() createProductDto: CreateProductDto){
        return this.productsService.addProduct(createProductDto);
    }
    @Post('seeder')
    @ApiOperation({ summary: 'If starting from scratch, create some initial products' })
    addProductSeeder(){
        return this.productsService.addProductSeeder();
    }

    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Edit products (Admin only)' })
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() product: Product) {
        return this.productsService.updateProduct(id, product)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete products (Admin only)' })
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
