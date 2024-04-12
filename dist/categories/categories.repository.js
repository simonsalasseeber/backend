"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("../entities/categories.entity");
const products_repository_1 = require("../products/products.repository");
let CategoriesRepository = class CategoriesRepository {
    constructor(categoriesRepository, productsRepository) {
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
    }
    async getCategories() {
        const data = await this.productsRepository.dataSource();
        const categories = [...new Set(data.map(item => item.category))];
        return categories;
    }
    async findByName(category) {
        const foundCategory = await this.categoriesRepository.findOne({ where: { name: category.name } });
        return foundCategory ? foundCategory.id : undefined;
    }
    async addCategories() {
        const data = await this.productsRepository.dataSource();
        const categories = new Set();
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
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_repository_1.ProductsRepository])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map