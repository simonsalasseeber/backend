import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { CreateProductDto } from './products.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';

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
    async addProduct(product: Product) {
        const { name, description, price, stock, imgUrl, category } = product;
        
        const categoryId = await this.categoriesRepository.findBy({id: category.id});

        if (categoryId) {
            return await this.productsRepository.addProduct(name, description, price, stock, imgUrl, category);
        } else {
            throw new Error(`Category '${category.name}' not found`);
        }
     }
    addProductSeeder() {
        return this.productsRepository.addProductSeeder()
    }
    updateProduct(id: string, product: any) {
        return this.productsRepository.updateProduct(id, product)
    }
    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id)
    }
}