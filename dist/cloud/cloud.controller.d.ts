/// <reference types="multer" />
import { CloudService } from './cloud.service';
export declare class CloudController {
    private readonly cloudService;
    constructor(cloudService: CloudService);
    uploadImage(productId: string, file: Express.Multer.File): Promise<import("src/entities/products.entity").Product>;
}
