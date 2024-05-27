import { ProductsService } from './products.service';
import { CreateProductDto } from './products.dto';
import { Product } from 'src/entities/products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | "Couldn't find the product">;
    addProduct(createProductDto: CreateProductDto): Promise<Product>;
    addProductSeeder(): Promise<Product[]>;
    updateProduct(id: string, product: Product): Promise<Product | "couldn't find product">;
    deleteProduct(id: string): Promise<string>;
}
