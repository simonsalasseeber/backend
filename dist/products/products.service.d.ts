import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';
export declare class ProductsService {
    private readonly categoriesRepository;
    private readonly productsRepository;
    constructor(categoriesRepository: Repository<Category>, productsRepository: ProductsRepository);
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | "Couldn't find the product">;
    addProduct(product: Product): Promise<Product>;
    addProductSeeder(): Promise<Product[]>;
    updateProduct(id: string, product: any): Promise<Product | "couldn't find product">;
    deleteProduct(id: string): Promise<string>;
}
