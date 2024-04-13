import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logindto } from './auth.logindto';
import { UserDto } from 'src/users/users.dto';
import { AuthGuard } from './guards/auth.guards';
import { RolesGuard } from './guards/roles.guard';

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
