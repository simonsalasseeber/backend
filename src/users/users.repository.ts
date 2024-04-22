import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/users.entity";
import { Repository } from "typeorm";
import { UserDto } from "./users.dto";

@Injectable() 
export class UsersRepository {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getUsers(page: number, limit: number): Promise<Partial<User>[]> {
        const offset = (page - 1) * limit;
        const users = await this.usersRepository.find();
        const usersWithoutPassword = users.map(({password, ...user}) => user);
        return usersWithoutPassword.slice(offset, offset + limit);
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: {id},
            relations: [
                'orders', 
                'orders.orderDetail'
            ]
        });

        if(!user) {
            return "couldn't find user"
        }

        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }
    
    async getUserByEmail(email: string) {
        const allUsers = await this.usersRepository.find();
        const user = allUsers.find(user => user.email === email);
        return user; 
    }
    
    async addUser(user: Partial<User>): Promise<Partial<User>> {
        const AddedUser = await this.usersRepository.save(user);;
        const { password, ...userWithoutPassword } = AddedUser;
        return userWithoutPassword;
    }
    
    async updateUser(id: string, user: UserDto) {
        await this.usersRepository.update(id, user);
        const foundUser = this.usersRepository.findOneBy({id})
        return foundUser;
    }
    
    async deleteUser(id: string) {
        const user = await this.usersRepository.findOneBy({id});
        await this.usersRepository.remove(user)
        return "user deleted successfully"
    }
    
}