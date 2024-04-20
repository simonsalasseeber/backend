import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "src/entities/orderdetail.entity";
import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { ProductsRepository } from "src/products/products.repository";
import { In, Repository } from "typeorm";



@Injectable() 
export class OrdersRepository {
    constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>, 
    @InjectRepository(Product) private productsRepository: Repository<Product>, // CRUD operations
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User) private usersRepository: Repository<User>,) {}
    
    async getOrder(orderId: string): Promise<any> {
        const order = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderDetail', 'orderDetail')
        .leftJoinAndSelect('orderDetail.products', 'products')
        .where('order.id = :orderId', { orderId })
        .getOne();        
        
        if (!order) {
            throw new Error(`Order with ID '${orderId}' not found.`);
        }

        console.log('Fetched order:', order);

        const orderDetails = {
            order: order,
            orderItems: order.orderDetail ? order.orderDetail.products : [],
        };

        return orderDetails;
    
    }

    async addOrder(userId: string, productIds: string[]): Promise<Order> {
        // Busca al usuario por su ID
        const user = await this.usersRepository.findOneBy({id: userId});
        if (!user) {
            throw new Error(`User with ID '${userId}' not found.`);
        }
        const order = new Order();
        order.date = new Date();
        order.user = user;

        const savedOrder = await this.ordersRepository.save(order);


        const products = await this.productsRepository.find({ // promise.all
            where: {
              id: In(productIds),
            },
        });

        if (products.length === 0) {
            throw new Error(`No products found with the provided IDs or out of stock.`);
        }

        let totalPrice = 0;
        for (const product of products) {
            totalPrice += product.price;
            product.stock -= 1;
        }

        await this.productsRepository.save(products);

        const orderDetail = new OrderDetail();
        orderDetail.products = products;
        orderDetail.price = totalPrice;
        orderDetail.order = savedOrder;

        await this.orderDetailRepository.save(orderDetail);

        order.orderDetail = orderDetail;

        return await this.ordersRepository.findOne({
            where: {
                id: savedOrder.id,
            },
            relations: {
                orderDetail: true,
            },
        });
    }
}
