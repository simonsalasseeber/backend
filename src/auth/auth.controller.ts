import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logindto } from './auth.dto';
import { UserDto } from 'src/users/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
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
