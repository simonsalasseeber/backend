import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth() {
        return this.authService.getAuth();
    }

    @Post('signin')
    signIn(@Body() credential: any) {
        const {email, password} = credential;
        return this.authService.signIn(email, password)
    }

}
