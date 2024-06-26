import { UsersRepository } from '../users/users.repository';
import { logindto } from './auth.dto';
import { UserDto } from '../users/users.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    signIn(logindto: logindto): Promise<{
        token: string;
        message: string;
    }>;
    signUp(user: Partial<UserDto>): Promise<Partial<import("src/entities/users.entity").User>>;
}
