/// <reference types="node" />
import { OrdersService } from './orders.service';
import { UUID } from 'crypto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    postOrder(userId: UUID, products: string[]): Promise<import("src/entities/orders.entity").Order>;
    getOrder(orderId: string): Promise<any>;
}
