import { Controller, Post, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UUID } from 'crypto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    postOrder(userId: UUID, products: string[]) {
        return this.ordersService.addOrder(userId, products)
    }

    @Get()
    getOrder(orderId: string) {
        return this.ordersService.getOrder(orderId)
    }

}
