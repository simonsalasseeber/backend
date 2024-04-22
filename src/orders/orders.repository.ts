import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "../entities/orderdetail.entity";
import { Order } from "../entities/orders.entity";
import { Product } from "../entities/products.entity";
import { User } from "../entities/users.entity";
import { MoreThan, Repository } from "typeorm";
import { addOrderDto } from "./orders.dto";



@Injectable() 
export class OrdersRepository {
    constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>, 
    @InjectRepository(Product) private productsRepository: Repository<Product>, // CRUD operations
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User) private usersRepository: Repository<User>,) {}
    
    async getOrder(orderId: string): Promise<any> {
        const order = await this.ordersRepository.findOne({
          where: { id: orderId },
          relations: ['orderDetail', 'orderDetail.products']
      });       
        
        if (!order) {
            throw new BadRequestException(`Order with ID '${orderId}' not found.`);
        }

        return order;
    
    }

    async addOrder(addOrderDto: addOrderDto): Promise<Order> {
        const userId = addOrderDto.userId;
        const productIds = addOrderDto.productIds;
    
        const user = await this.usersRepository.findOneBy({ id: userId });
    
        const order = new Order();
        order.user = user;
        order.date = new Date();
    
        const savedOrder = await this.ordersRepository.save(order);
    
        let arrayOfProducts = await Promise.all(
            productIds.map(async (product) => {
              const foundProduct = await this.productsRepository.findOne({
                where: { id: product, stock: MoreThan(0) },
              });
              if (!foundProduct) throw new NotFoundException('Product not found');
              foundProduct.stock -= 1;
              const savedProduct = await this.productsRepository.save(foundProduct);
              return savedProduct;
            })
          )
          .catch(error => {throw error})
          

            let price = 0;
            arrayOfProducts.forEach((product) => {
            price += Number(product.price);
            });

          const orderDetail = this.orderDetailRepository.create({
            price,
            order: savedOrder,
            products: arrayOfProducts,
          });

          const savedOrderDetail = await this.orderDetailRepository.save(orderDetail);
          savedOrder.orderDetail = savedOrderDetail;
          await this.ordersRepository.save(savedOrder);
          return savedOrder;
        }
    }

    
    
