import { OrdersService } from './orders.service';
import { addOrderDto } from './orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    postOrder(addOrderDto: addOrderDto): Promise<import("src/entities/orders.entity").Order>;
    getOrder(orderId: string): Promise<any>;
}
