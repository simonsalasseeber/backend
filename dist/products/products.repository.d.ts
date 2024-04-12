import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { Category } from "src/entities/categories.entity";
export declare class ProductsRepository {
    private productsRepository;
    private categoryRepository;
    constructor(productsRepository: Repository<Product>, categoryRepository: Repository<Category>);
    dataSource(): Promise<any>;
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | "Couldn't find the product">;
    getProductsByIds(ids: string[]): Promise<any[]>;
    addProduct(name: string, description: string, price: number, stock: number, imgUrl: string, category: Category): Promise<Product>;
    addProductSeeder(): Promise<Product[]>;
    updateProduct(id: string, product: any): Promise<Product | "couldn't find product">;
    deleteProduct(id: string): Promise<string>;
}
