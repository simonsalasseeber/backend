import { User } from './users.entity';
import { OrderDetail } from './orderdetail.entity';
export declare class Order {
    id: string;
    user: Partial<User>;
    date: Date;
    orderDetail: OrderDetail;
}
