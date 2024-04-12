import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { ProductsRepository } from "src/products/products.repository";
import { Repository } from "typeorm";
export declare class OrdersRepository {
    private ordersRepository;
    private productsRepository;
    private productsCustomRepository;
    private usersRepository;
    constructor(ordersRepository: Repository<Order>, productsRepository: Repository<Product>, productsCustomRepository: ProductsRepository, usersRepository: Repository<User>);
    getOrder(orderId: string): Promise<any>;
    addOrder(userId: string, productIds: string[]): Promise<Order>;
}
