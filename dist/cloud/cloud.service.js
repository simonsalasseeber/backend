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
exports.CloudService = void 0;
const common_1 = require("@nestjs/common");
const cloud_repository_1 = require("./cloud.repository");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../entities/products.entity");
const typeorm_2 = require("typeorm");
let CloudService = class CloudService {
    constructor(cloudRepository, productsRepository) {
        this.cloudRepository = cloudRepository;
        this.productsRepository = productsRepository;
    }
    async uploadImage(productId, file) {
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new common_1.NotFoundException("Couldn't find the product");
        }
        const FullImageObject = await this.cloudRepository.uploadImage(file);
        await this.productsRepository.update(product.id, {
            imgUrl: FullImageObject.secure_url,
        });
        const newProduct = await this.productsRepository.findOneBy({
            id: product.id
        });
        return newProduct;
    }
};
exports.CloudService = CloudService;
exports.CloudService = CloudService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [cloud_repository_1.CloudRepository,
        typeorm_2.Repository])
], CloudService);
//# sourceMappingURL=cloud.service.js.map