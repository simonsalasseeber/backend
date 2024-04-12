import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { logindto } from './auth.logindto';
import { UserDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}
    getAuth() {
        return "this is my auth";
    }
    async signIn(logindto: logindto) {
        const { email, password } = logindto;

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
    async signUp(user: Partial<UserDto>){
        const {email, password} = user;
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if (foundUser) {
            throw new BadRequestException('you already have an account'); 
        } 

        const passwordHash = await bcrypt.hash(password, 10);

        return await this.usersRepository.addUser({
            ...user,
            password: passwordHash
        })
    }
}
