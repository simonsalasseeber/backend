import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "src/entities/orderdetail.entity";
import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { ProductsRepository } from "src/products/products.repository";
import { UsersRepository } from "src/users/users.repository";
import { Repository } from "typeorm";



@Injectable() 
export class OrdersRepository {
    constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>, 
    @InjectRepository(Product) private productsRepository: Repository<Product>, // CRUD operations
    @InjectRepository(Product) private productsCustomRepository: ProductsRepository, // Custom Operations
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
        // Crea una nueva orden y la asocia con el usuario encontrado
        const order = new Order();
        order.date = new Date();
        order.user = user;

        // Busca los productos por sus IDs y filtra aquellos con stock mayor a 0
        const products = await this.productsCustomRepository.getProductsByIds(productIds);

        if (products.length === 0) {
            throw new Error(`No products found with the provided IDs or out of stock.`);
        }

        // Calcula el precio total de la compra y reduce el stock de los productos correspondientes
        let totalPrice = 0;
        for (const product of products) {
            totalPrice += product.price;
            product.stock -= 1;
        }

        // Guarda los cambios en los productos
        await this.productsRepository.save(products);

       // Construye y registra un detalle de compra con los productos seleccionados
        const orderDetail = new OrderDetail();
        orderDetail.products = products;
        orderDetail.price = totalPrice;

        // Asocia el detalle de compra con la orden
        order.orderDetail = orderDetail;

        // Guarda la orden en la base de datos
        const savedOrder = await this.ordersRepository.save(order);

        // Devuelve la orden de compra con el precio y el ID del detalle de compra
        return savedOrder;
    }
}
