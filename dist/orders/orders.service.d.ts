import { OrdersRepository } from './orders.repository';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    addOrder(userId: string, productIds: string[]): Promise<import("src/entities/orders.entity").Order>;
    getOrder(orderId: string): Promise<any>;
}
