import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "src/entities/categories.entity";
//import data from archivo a descargar de henry

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ) {}

    async addCategories() {
       
    }
}