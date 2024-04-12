"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_controller_1 = require("./cloud.controller");
const cloud_service_1 = require("./cloud.service");
const cloudinary_1 = require("../config/cloudinary");
const cloud_repository_1 = require("./cloud.repository");
const products_repository_1 = require("../products/products.repository");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../entities/products.entity");
const categories_entity_1 = require("../entities/categories.entity");
let CloudModule = class CloudModule {
};
exports.CloudModule = CloudModule;
exports.CloudModule = CloudModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([products_entity_1.Product, categories_entity_1.Category])],
        controllers: [cloud_controller_1.CloudController],
        providers: [cloud_service_1.CloudService, cloudinary_1.cloudinaryConfig, cloud_repository_1.CloudRepository, products_repository_1.ProductsRepository]
    })
], CloudModule);
//# sourceMappingURL=cloud.module.js.map