import { Controller, Post, Get, UseGuards, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    postOrder(@Body('userId') userId: string, @Body('productIds') productIds: string[]) {
        return this.ordersService.addOrder(userId, productIds)
    }

    @Get(':id')
    getOrder(@Param('id') orderId: string) {
        return this.ordersService.getOrder(orderId)
    }

}
