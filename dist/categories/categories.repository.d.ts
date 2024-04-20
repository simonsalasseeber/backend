import { Repository } from "typeorm";
import { Category } from "src/entities/categories.entity";
import { ProductsRepository } from "src/products/products.repository";
export declare class CategoriesRepository {
    private categoriesRepository;
    private productsRepository;
    constructor(categoriesRepository: Repository<Category>, productsRepository: ProductsRepository);
    getCategories(): Promise<unknown[]>;
    findByName(category: Category): Promise<string | undefined>;
    addCategories(): Promise<string[]>;
}
