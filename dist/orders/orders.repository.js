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
const typeorm_2 = require("typeorm");
let OrdersRepository = class OrdersRepository {
    constructor(ordersRepository, productsRepository, orderDetailRepository, usersRepository) {
        this.ordersRepository = ordersRepository;
        this.productsRepository = productsRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.usersRepository = usersRepository;
    }
    async getOrder(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetail', 'orderDetail.products']
        });
        if (!order) {
            throw new common_1.BadRequestException(`Order with ID '${orderId}' not found.`);
        }
        return order;
    }
    async addOrder(addOrderDto) {
        const userId = addOrderDto.userId;
        const productIds = addOrderDto.productIds;
        const user = await this.usersRepository.findOneBy({ id: userId });
        const order = new orders_entity_1.Order();
        order.user = user;
        order.date = new Date();
        const savedOrder = await this.ordersRepository.save(order);
        let arrayOfProducts = await Promise.all(productIds.map(async (product) => {
            const foundProduct = await this.productsRepository.findOne({
                where: { id: product, stock: (0, typeorm_2.MoreThan)(0) },
            });
            if (!foundProduct)
                throw new common_1.NotFoundException('Product not found');
            foundProduct.stock -= 1;
            const savedProduct = await this.productsRepository.save(foundProduct);
            return savedProduct;
        }))
            .catch(error => { throw error; });
        let price = 0;
        arrayOfProducts.forEach((product) => {
            price += Number(product.price);
        });
        const orderDetail = this.orderDetailRepository.create({
            price,
            order: savedOrder,
            products: arrayOfProducts,
        });
        const savedOrderDetail = await this.orderDetailRepository.save(orderDetail);
        savedOrder.orderDetail = savedOrderDetail;
        await this.ordersRepository.save(savedOrder);
        return savedOrder;
    }
    async deleteOrder(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId }
        });
        if (!order) {
            throw new common_1.BadRequestException(`Order with ID '${orderId}' not found.`);
        }
        const productsIds = order.orderDetail.products;
        let arrayOfProducts = await Promise.all(productsIds.map(async (product) => {
            const foundProduct = await this.productsRepository.findOne({
                where: { id: product.id },
            });
            if (!foundProduct)
                throw new common_1.NotFoundException('Product not found');
            foundProduct.stock += 1;
            const savedProduct = await this.productsRepository.save(foundProduct);
            return savedProduct;
        }))
            .catch(error => { throw error; });
        await this.ordersRepository.remove(order);
        return "order deleted succesfully";
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(orderdetail_entity_1.OrderDetail)),
    __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map