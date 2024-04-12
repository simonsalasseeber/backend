/// <reference types="multer" />
import { CloudRepository } from './cloud.repository';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
export declare class CloudService {
    private readonly cloudRepository;
    private readonly productsRepository;
    constructor(cloudRepository: CloudRepository, productsRepository: Repository<Product>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<Product>;
}
