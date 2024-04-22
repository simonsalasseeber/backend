import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { logindto } from './auth.dto';
import { UserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}
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
            throw new BadRequestException("user not found")
        }

        const validPassword = bcrypt.compare(password, user.password)

        if(!validPassword) {
            throw new BadRequestException("error with your password")
        }

        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin 
        }

        const token = this.jwtService.sign(payload) 

        return {
            token,
            message: "successfull login"
        }
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
            password: passwordHash,
            isAdmin: false
        })
    }
}
