import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { UserDto } from "./users.dto";
export declare class UsersRepository {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getUsers(): Promise<Partial<User>[]>;
    getUserById(id: any): Promise<"couldn't find user" | {
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("src/entities/orders.entity").Order[];
    }>;
    getUserByEmail(email: string): Promise<User>;
    addUser(user: UserDto): Promise<Partial<User>>;
    updateUser(id: string, user: UserDto): Promise<User>;
    deleteUser(id: string): Promise<string>;
}
