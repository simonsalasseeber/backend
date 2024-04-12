import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logindto } from './auth.logindto';
import { UserDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth() {
        return this.authService.getAuth();
    }

    @Post('signin')
    signIn(@Body() credential: logindto) {
        return this.authService.signIn(credential)
    }

    @Post('signup')
    signUp(@Body() user: Partial<UserDto>){
        return this.authService.signUp(user)
    }
}
