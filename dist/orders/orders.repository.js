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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderdetail_entity_1 = require("../entities/orderdetail.entity");
const orders_entity_1 = require("../entities/orders.entity");
const products_entity_1 = require("../entities/products.entity");
const users_entity_1 = require("../entities/users.entity");
const products_repository_1 = require("../products/products.repository");
const typeorm_2 = require("typeorm");
let OrdersRepository = class OrdersRepository {
    constructor(ordersRepository, productsRepository, productsCustomRepository, usersRepository) {
        this.ordersRepository = ordersRepository;
        this.productsRepository = productsRepository;
        this.productsCustomRepository = productsCustomRepository;
        this.usersRepository = usersRepository;
    }
    async getOrder(orderId) {
        const order = await this.ordersRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.orderDetail', 'orderDetail')
            .leftJoinAndSelect('orderDetail.products', 'products')
            .where('order.id = :orderId', { orderId })
            .getOne();
        if (!order) {
            throw new Error(`Order with ID '${orderId}' not found.`);
        }
        const orderDetails = {
            order: order,
            orderItems: order.orderDetail ? order.orderDetail.products : [],
        };
        return orderDetails;
    }
    async addOrder(userId, productIds) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`User with ID '${userId}' not found.`);
        }
        const order = new orders_entity_1.Order();
        order.date = new Date();
        order.user = user;
        const products = await this.productsCustomRepository.getProductsByIds(productIds);
        if (products.length === 0) {
            throw new Error(`No products found with the provided IDs or out of stock.`);
        }
        let totalPrice = 0;
        for (const product of products) {
            totalPrice += product.price;
            product.stock -= 1;
        }
        await this.productsRepository.save(products);
        const orderDetail = new orderdetail_entity_1.OrderDetail();
        orderDetail.products = products;
        orderDetail.price = totalPrice;
        order.orderDetail = orderDetail;
        const savedOrder = await this.ordersRepository.save(order);
        return savedOrder;
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_repository_1.ProductsRepository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map