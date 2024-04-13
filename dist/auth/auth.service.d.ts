import { UsersRepository } from 'src/users/users.repository';
import { logindto } from './auth.logindto';
import { UserDto } from 'src/users/users.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    getAuth(): string;
    signIn(logindto: logindto): Promise<"missing email/password" | {
        token: string;
        message: string;
    }>;
    signUp(user: Partial<UserDto>): Promise<Partial<import("src/entities/users.entity").User>>;
}
