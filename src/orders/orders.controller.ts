import { Controller, Post, Get, UseGuards, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { addOrderDto } from './orders.dto';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @ApiOperation({summary: "Add an order to a particular user - it creates the attached order detail"})
    postOrder(@Body() addOrderDto: addOrderDto) {
        return this.ordersService.addOrder(addOrderDto);
    }

    @Get(':id')
    @ApiOperation({summary: "Get order specifications by id"})
    getOrder(@Param('id') orderId: string) {
        return this.ordersService.getOrder(orderId)
    }

    @Delete(':id')
    @ApiOperation({summary: "Delete order by id"})
    deleteOrder(@Param('id') orderId: string) {
        return this.ordersService.deleteOrder(orderId)
    }

}
