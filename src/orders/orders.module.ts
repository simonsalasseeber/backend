import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/orderdetail.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsRepository } from 'src/products/products.repository';
import { UsersRepository } from 'src/users/users.repository';
import { OrdersRepository } from './orders.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { Category } from 'src/entities/categories.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail, Order, User, Product, Category])],
    controllers:[OrdersController],
    providers: [OrdersRepository, OrdersService, ProductsRepository, UsersRepository, CategoriesRepository]
})
export class OrdersModule {}
