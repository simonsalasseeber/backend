import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
   } from 'typeorm';
   import { Order } from './orders.entity';
import { Product } from './products.entity';
   
   @Entity()
   export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
   
    @OneToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn()
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable() // lo hace automático typeorm
    products: Product[];   
}
   