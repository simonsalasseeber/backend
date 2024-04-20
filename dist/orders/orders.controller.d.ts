import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    postOrder(userId: string, productIds: string[]): Promise<import("src/entities/orders.entity").Order>;
    getOrder(orderId: string): Promise<any>;
}
