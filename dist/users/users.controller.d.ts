import { UsersService } from './users.service';
import { UserDto } from './users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page: number, limit: number): Promise<Partial<import("src/entities/users.entity").User>[]>;
    getUserById(id: string): Promise<"couldn't find user" | {
        id: string;
        isAdmin: boolean;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("src/entities/orders.entity").Order[];
    }>;
    updateUser(id: string, user: Partial<UserDto>): Promise<import("src/entities/users.entity").User>;
    deleteUser(id: string): Promise<string>;
}
