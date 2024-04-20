import { AuthService } from './auth.service';
import { logindto } from './auth.dto';
import { UserDto } from 'src/users/users.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    signIn(credential: logindto): Promise<"missing email/password" | {
        token: string;
        message: string;
    }>;
    signUp(user: UserDto): Promise<Partial<import("src/entities/users.entity").User>>;
}
