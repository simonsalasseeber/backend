import { Injectable } from "@nestjs/common";
import {User} from './users.models';

@Injectable() 
export class UsersRepository {
    private users: User[] = [
        {
            id: 1,
            email: 'user1@example.com',
            name: 'Juan Pérez',
            password: 'password123',
            address: 'Calle Falsa 123',
            phone: '555-1234',
            country: 'España',
            city: 'Madrid'
         },
         {
            id: 2,
            email: 'user2@example.com',
            name: 'María Rodríguez',
            password: 'password456',
            address: 'Avenida Siempre Viva 456',
            phone: '555-5678',
            country: 'México',
            city: 'Ciudad de México'
         },
         {
            id: 3,
            email: 'user3@example.com',
            name: 'Carlos García',
            password: 'password789',
            address: 'Boulevard de los Sueños Rotos 789',
            phone: '555-9012',
            country: 'Argentina',
            city: 'Buenos Aires'
         }
    ];
    async getUsers() {
        return this.users.map(({password, ...user}) => user);
    }
    async getUserById(id) {
        const user = this.users.find(user => user.id === Number(id))
        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }
    async getUserByEmail(email: string) {
        return this.users.find(user => user.email === email)
    }

    async addUser(user: User) {
        const id = this.users.length + 1;
        user.id = id;
        this.users.push(user)
        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }
    async updateUser(id: string, user: User) {
        const foundUser = this.users.find(user => user.id === Number(id));
        if (!foundUser) {
            return "Couldn't find user"
        }
        const updatedUser = {...foundUser, ...user}
        const index = this.users.findIndex((user) => user.id === Number(id));
        this.users[index] = updatedUser;
        return updatedUser.id;
    }
    async deleteUser(id: string) {
        const index = this.users.findIndex((user) => user.id === Number(id));
        const user = this.users[index];
        this.users.splice(index, 1);
        return user.id;
    }
}