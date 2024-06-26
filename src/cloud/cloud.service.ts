import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudRepository } from './cloud.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudService {
    constructor(private readonly cloudRepository: CloudRepository,
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>
    ) {}

    async uploadImage(productId: string, file: Express.Multer.File) {
        const product = await this.productsRepository.findOneBy({id: productId})
        if(!product) {
            throw new NotFoundException("Couldn't find the product")
        }
        const FullImageObject = await this.cloudRepository.uploadImage(file)
        await this.productsRepository.update(product.id, {
            imgUrl: FullImageObject.secure_url,
        })
        const newProduct = await this.productsRepository.findOneBy({
            id: product.id
        })
        return newProduct;
    }
}
