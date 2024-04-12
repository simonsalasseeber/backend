"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderdetail_entity_1 = require("../entities/orderdetail.entity");
const orders_entity_1 = require("../entities/orders.entity");
const products_entity_1 = require("../entities/products.entity");
const users_entity_1 = require("../entities/users.entity");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const products_repository_1 = require("../products/products.repository");
const users_repository_1 = require("../users/users.repository");
const orders_repository_1 = require("./orders.repository");
const categories_repository_1 = require("../categories/categories.repository");
const categories_entity_1 = require("../entities/categories.entity");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orderdetail_entity_1.OrderDetail, orders_entity_1.Order, users_entity_1.User, products_entity_1.Product, categories_entity_1.Category])],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_repository_1.OrdersRepository, orders_service_1.OrdersService, products_repository_1.ProductsRepository, users_repository_1.UsersRepository, categories_repository_1.CategoriesRepository]
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map