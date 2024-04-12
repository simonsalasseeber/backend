import { Order } from './orders.entity';
import { Product } from './products.entity';
export declare class OrderDetail {
    id: string;
    price: number;
    order: Order;
    products: Product[];
}
