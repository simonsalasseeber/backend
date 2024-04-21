import { CategoriesRepository } from './categories.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    addCategories(): Promise<string[]>;
    getCategories(): Promise<import("src/entities/categories.entity").Category[]>;
}
