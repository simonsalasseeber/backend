import { OrdersRepository } from './orders.repository';
import { addOrderDto } from './orders.dto';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    addOrder(addOrderDto: addOrderDto): Promise<import("src/entities/orders.entity").Order>;
    getOrder(orderId: string): Promise<any>;
    deleteOrder(orderId: string): Promise<string>;
}
