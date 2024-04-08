import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
   } from 'typeorm';
   import { Category } from './categories.entity';
   import { OrderDetail } from './orderdetail.entity';
   
   @Entity()
   export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({ type: 'varchar', length: 50 })
    name: string;
   
    @Column({ type: 'text' })
    description: string;
   
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
   
    @Column({ type: 'int' })
    stock: number;
   
    @Column({ type: 'varchar', length: 255, default: 'default-image-url.jpg' })
    imgUrl: string;
   
    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: Category;
   
    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    @JoinTable({name: "ORDER_DETAIL_PRODUCTS"})
    orderDetails: OrderDetail[];
   }
   