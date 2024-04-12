import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UUID } from 'crypto';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}
    async addOrder(userId: UUID, products: string[]) {
        return this.ordersRepository.addOrder(userId, products);
    }
    async getOrder(orderId: string) {
        return this.ordersRepository.getOrder(orderId);
      }
}
