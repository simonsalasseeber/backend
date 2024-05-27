import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Post('seeder')
    @ApiOperation({ summary: 'If starting from scratch, add some categories' })
    addCategories() {
        return this.categoriesService.addCategories()
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    getCategories() {
        return this.categoriesService.getCategories()
    }
}
