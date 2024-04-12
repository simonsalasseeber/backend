import { UsersRepository } from 'src/users/users.repository';
import { logindto } from './auth.logindto';
export declare class AuthService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getAuth(): string;
    signIn(logindto: logindto): Promise<"missing email/password" | "user not found" | "logged in" | "invalidcredentials">;
}
