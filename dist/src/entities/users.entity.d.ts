import { Order } from './orders.entity';
export declare class User {
    id: string;
    isAdmin: boolean;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    orders: Order[];
}
