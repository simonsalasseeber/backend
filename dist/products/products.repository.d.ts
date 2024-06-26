import { Product } from "../entities/products.entity";
import { Repository } from "typeorm";
import { Category } from "../entities/categories.entity";
import { CreateProductDto } from "./products.dto";
export declare class ProductsRepository {
    private productsRepository;
    private categoryRepository;
    constructor(productsRepository: Repository<Product>, categoryRepository: Repository<Category>);
    dataSource(): Promise<any>;
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | "Couldn't find the product">;
    getProductsByIds(ids: string[]): Promise<any[]>;
    addProduct(createProductDto: CreateProductDto, category: Category): Promise<Product>;
    addProductSeeder(): Promise<Product[]>;
    updateProduct(id: string, product: Product): Promise<Product | "couldn't find product">;
    deleteProduct(id: string): Promise<string>;
}
