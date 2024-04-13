import { UsersRepository } from './users.repository';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
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
    addUser(user: any): Promise<Partial<import("src/entities/users.entity").User>>;
    updateUser(id: string, user: any): Promise<import("src/entities/users.entity").User>;
    deleteUser(id: string): Promise<string>;
}
