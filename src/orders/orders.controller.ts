import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @UseGuards(AuthGuard)
    postOrder(userId: UUID, products: string[]) {
        return this.ordersService.addOrder(userId, products)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(orderId: string) {
        return this.ordersService.getOrder(orderId)
    }

}
