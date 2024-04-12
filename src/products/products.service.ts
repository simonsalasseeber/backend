import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository,
                private readonly categoriesRepository: CategoriesRepository
    ){}
    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit);
    }
    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }
    async addProduct(product: Product) {
        const { name, description, price, stock, imgUrl, category } = product;
        
        const categoryId = await this.categoriesRepository.findByName(category);

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