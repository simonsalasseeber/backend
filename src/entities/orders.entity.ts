import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
   } from 'typeorm';
   import { User } from './users.entity';
   import { OrderDetail } from './orderdetail.entity';
   
   @Entity()
   export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn()
    user: Partial<User>;
   
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
   
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order) // 1st "u relate w him" 2nd this way
    orderDetail: OrderDetail;
   }
   