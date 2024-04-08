import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
   } from 'typeorm';
   import { Product } from './products.entity';
   
   @Entity()
   export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({ type: 'varchar', length: 50 })
    name: string;
   
    @OneToMany(() => Product, (product) => product.category)
    products: Product[]; // doubts if it should be 1:1 or 1:N
   }
   