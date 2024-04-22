import { Repository } from "typeorm";
import { Category } from "../entities/categories.entity";
import { ProductsRepository } from "../products/products.repository";
export declare class CategoriesRepository {
    private categoriesRepository;
    private productsRepository;
    constructor(categoriesRepository: Repository<Category>, productsRepository: ProductsRepository);
    getCategories(): Promise<Category[]>;
    findByName(category: Category): Promise<string | undefined>;
    addCategories(): Promise<string[]>;
}
