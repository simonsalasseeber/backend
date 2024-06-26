import { AuthService } from './auth.service';
import { logindto } from './auth.dto';
import { UserDto } from '../users/users.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(credential: logindto): Promise<{
        token: string;
        message: string;
    }>;
    signUp(user: UserDto): Promise<Partial<import("src/entities/users.entity").User>>;
}
