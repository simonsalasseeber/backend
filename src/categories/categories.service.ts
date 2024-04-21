import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    addCategories(){
        return this.categoriesRepository.addCategories(); //no paso data porque la busca desde el json
    }

    getCategories() {
        return this.categoriesRepository.getCategories();
    }
}
