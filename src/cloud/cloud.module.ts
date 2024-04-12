import { Module } from '@nestjs/common';
import { CloudController } from './cloud.controller';
import { CloudService } from './cloud.service';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { CloudRepository } from './cloud.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [CloudController],
  providers: [CloudService, cloudinaryConfig, CloudRepository, ProductsRepository]
})
export class CloudModule {}
