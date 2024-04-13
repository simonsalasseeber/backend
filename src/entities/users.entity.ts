import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Unique,
   } from 'typeorm';
   import { Order } from './orders.entity';
   
   @Entity()
   @Unique(['email']) // Asegura que el email sea único
   export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: false,
    })
    isAdmin: boolean;
   
    @Column({ type: 'varchar', length: 50 })
    name: string;
   
    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;
   
    @Column({ type: 'varchar', length: 100 })
    password: string;
   
    @Column({ type: 'varchar' })
    phone: number;
   
    @Column({ type: 'varchar', length: 50 })
    country: string;
   
    @Column({ type: 'text' })
    address: string;
   
    @Column({ type: 'varchar', length: 50 })
    city: string;
   
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
   }
   