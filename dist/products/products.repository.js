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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../entities/products.entity");
const typeorm_2 = require("typeorm");
const promises_1 = require("fs/promises");
const categories_entity_1 = require("../entities/categories.entity");
let ProductsRepository = class ProductsRepository {
    constructor(productsRepository, categoryRepository) {
        this.productsRepository = productsRepository;
        this.categoryRepository = categoryRepository;
    }
    async dataSource() {
        const file = await (0, promises_1.readFile)('../ecommerce-simonsalasseeber/src/products/data.json', 'utf-8');
        const json = JSON.parse(file);
        return json;
    }
    async getProducts(page, limit) {
        const offset = (page - 1) * limit;
        const allProducts = await this.productsRepository.find();
        return allProducts.slice(offset, offset + limit);
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({
            where: { id }
        });
        if (!product) {
            return "Couldn't find the product";
        }
        return product;
    }
    async getProductsByIds(ids) {
        const allProducts = await this.productsRepository.find();
        return allProducts.filter(product => ids.includes(product.id.toString()));
    }
    async addProduct(name, description, price, stock, imgUrl, category) {
        const newProduct = new products_entity_1.Product();
        newProduct.name = name;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.stock = stock;
        newProduct.imgUrl = imgUrl;
        newProduct.category = category;
        return await this.productsRepository.save(newProduct);
    }
    async addProductSeeder() {
        const productsData = await this.dataSource();
        const seededProducts = [];
        for (const productData of productsData) {
            const category = await this.categoryRepository.findOne({ where: { name: productData.category } });
            if (category) {
                const newProduct = this.productsRepository.create({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stock: productData.stock,
                    imgUrl: productData.imgUrl,
                    category: category
                });
                await this.productsRepository.save(newProduct);
                seededProducts.push(newProduct);
            }
            else {
                console.error(`Category '${productData.category}' not found for product '${productData.name}'`);
            }
        }
        return seededProducts;
    }
    async updateProduct(id, product) {
        const foundProduct = await this.productsRepository.findOne({
            where: { id }
        });
        if (!foundProduct) {
            return "couldn't find product";
        }
        await this.productsRepository.update(id, product);
        return await this.productsRepository.findOneBy({ id });
    }
    async deleteProduct(id) {
        const deletedProduct = await this.productsRepository.findOneBy({ id });
        await this.productsRepository.remove(deletedProduct);
        return "product deleted succesfully";
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map