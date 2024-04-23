import { ProductsService } from './products.service';
import { CreateProductDto } from './products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: number, limit: number): Promise<import("src/entities/products.entity").Product[]>;
    getProductById(id: string): Promise<import("src/entities/products.entity").Product | "Couldn't find the product">;
    addProduct(createProductDto: CreateProductDto): Promise<import("src/entities/products.entity").Product>;
    addProductSeeder(): Promise<import("src/entities/products.entity").Product[]>;
    updateProduct(id: string, product: any): Promise<import("src/entities/products.entity").Product | "couldn't find product">;
    deleteProduct(id: string): Promise<string>;
}
