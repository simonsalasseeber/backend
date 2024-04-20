import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}
    async addOrder(userId: string, productIds: string[]) {
        return this.ordersRepository.addOrder(userId, productIds);
    }
    async getOrder(orderId: string) {
        return this.ordersRepository.getOrder(orderId);
      }
}
