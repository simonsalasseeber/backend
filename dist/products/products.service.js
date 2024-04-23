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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_repository_1 = require("./products.repository");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("../entities/categories.entity");
let ProductsService = class ProductsService {
    constructor(categoriesRepository, productsRepository) {
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
    }
    getProducts(page, limit) {
        return this.productsRepository.getProducts(page, limit);
    }
    getProductById(id) {
        return this.productsRepository.getProductById(id);
    }
    async addProduct(createProductDto) {
        const category = await this.categoriesRepository.findOne({ where: { id: createProductDto.category } });
        if (!category) {
            throw new Error('Category not found');
        }
        return this.productsRepository.addProduct(createProductDto, category);
    }
    addProductSeeder() {
        return this.productsRepository.addProductSeeder();
    }
    updateProduct(id, product) {
        return this.productsRepository.updateProduct(id, product);
    }
    deleteProduct(id) {
        return this.productsRepository.deleteProduct(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_repository_1.ProductsRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map