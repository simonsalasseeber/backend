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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
const categories_repository_1 = require("../categories/categories.repository");
let ProductsService = class ProductsService {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    getProducts(page, limit) {
        return this.productsRepository.getProducts(page, limit);
    }
    getProductById(id) {
        return this.productsRepository.getProductById(id);
    }
    async addProduct(product) {
        const { name, description, price, stock, imgUrl, category } = product;
        const categoryId = await this.categoriesRepository.findByName(category);
        if (categoryId) {
            return await this.productsRepository.addProduct(name, description, price, stock, imgUrl, category);
        }
        else {
            throw new Error(`Category '${category.name}' not found`);
        }
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
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        categories_repository_1.CategoriesRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map