import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "src/entities/categories.entity";
import { ProductsRepository } from "src/products/products.repository";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        private productsRepository: ProductsRepository) {}

        async getCategories() {
            return await this.categoriesRepository.find({ relations: ['products'] });
        }
        async findByName(category: Category): Promise<string | undefined> {
            const foundCategory = await this.categoriesRepository.findOne({ where: { name: category.name } });
            return foundCategory ? foundCategory.id : undefined;
        }
        async addCategories() {
            const data = await this.productsRepository.dataSource();
            const categories = new Set<string>();

            for (const cat in data) {
                if (data.hasOwnProperty(cat)) {
                    const product = data[cat];
                    const category = product.category;
        
                    categories.add(category);
        
                    let existingCategory = await this.categoriesRepository.findOne({ where: { name: category } });
        
                    if (!existingCategory) {
                        existingCategory = this.categoriesRepository.create({ name: category });
                        await this.categoriesRepository.save(existingCategory);
                    }
                }
            }
            const uniqueCategories = Array.from(categories);
            return uniqueCategories;
        }

}