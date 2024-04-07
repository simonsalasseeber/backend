import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getAuth() {
        return "this is my auth";
    }
    async signIn(email: string, password: string) {
        if(!email || !password) {
            return "missing email/password";
        }
        const user = await this.usersRepository.getUserByEmail(email);
        if(!user) {
            return "user not found"
        }
        if(user.password === password) {
            return 'logged in'
        }
        return "invalidcredentials"
    }
}
