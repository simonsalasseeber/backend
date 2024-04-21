import { OrderDetail } from "src/entities/orderdetail.entity";
import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { addOrderDto } from "./orders.dto";
export declare class OrdersRepository {
    private ordersRepository;
    private productsRepository;
    private readonly orderDetailRepository;
    private usersRepository;
    constructor(ordersRepository: Repository<Order>, productsRepository: Repository<Product>, orderDetailRepository: Repository<OrderDetail>, usersRepository: Repository<User>);
    getOrder(orderId: string): Promise<any>;
    addOrder(addOrderDto: addOrderDto): Promise<Order>;
}
