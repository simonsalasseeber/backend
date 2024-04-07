import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getUsers() {
        return this.usersRepository.getUsers();
    }
    getUserById(id: string) {
        return this.usersRepository.getUserById(id)
    }
    addUser(user: any) {
        return this.usersRepository.addUser(user);
    }
    updateUser(id: string, user: any) {
        return this.usersRepository.updateUser(id, user)
    }
    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id);
    }

}
