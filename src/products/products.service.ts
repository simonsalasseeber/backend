import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository){}
    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit);
    }
    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }
    addProduct(product: any) {
        return this.productsRepository.addProduct(product)
    }
    updateProduct(id: string, product: any) {
        return this.productsRepository.updateProduct(id, product)
    }
    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id)
    }
}