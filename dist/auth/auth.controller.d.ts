import { AuthService } from './auth.service';
import { logindto } from './auth.logindto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    signIn(credential: logindto): Promise<"missing email/password" | "user not found" | "logged in" | "invalidcredentials">;
}
