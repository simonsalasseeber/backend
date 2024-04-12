import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { CategoriesRepository } from './categories.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, ProductsRepository]
})
export class CategoriesModule {}
