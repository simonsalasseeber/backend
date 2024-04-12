import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly categoriesRepository;
    constructor(productsRepository: ProductsRepository, categoriesRepository: CategoriesRepository);
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | "Couldn't find the product">;
    addProduct(product: Product): Promise<Product>;
    addProductSeeder(): Promise<Product[]>;
    updateProduct(id: string, product: any): Promise<Product | "couldn't find product">;
    deleteProduct(id: string): Promise<string>;
}
