import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>,
        private readonly productsRepository: ProductsRepository,
                
    ){}
    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit);
    }
    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }
    async addProduct(createProductDto: CreateProductDto) {
        const category = await this.categoriesRepository.findOne({ where: { id: createProductDto.category } });
        if (!category) {
        throw new Error('Category not found');
        }
        return this.productsRepository.addProduct(createProductDto, category);

    }

    addProductSeeder() {
        return this.productsRepository.addProductSeeder()
    }
    updateProduct(id: string, product: Product) {
        return this.productsRepository.updateProduct(id, product)
    }
    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id)
    }
}