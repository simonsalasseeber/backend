import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { addOrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}
    async addOrder(addOrderDto: addOrderDto) {
        return this.ordersRepository.addOrder(addOrderDto);
    }
    async getOrder(orderId: string) {
        return this.ordersRepository.getOrder(orderId);
      }
}
