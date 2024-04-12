/// <reference types="node" />
import { OrdersRepository } from './orders.repository';
import { UUID } from 'crypto';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    addOrder(userId: UUID, products: string[]): Promise<import("src/entities/orders.entity").Order>;
    getOrder(orderId: string): Promise<any>;
}
