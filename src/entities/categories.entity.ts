import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
   } from 'typeorm';
   import { Product } from './products.entity';
   
   @Entity()
   export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({ type: 'varchar', length: 10})
    name: string;
   
    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn()
    products: Product[]; // doubts if it should be 1:1 or 1:N
   }
   