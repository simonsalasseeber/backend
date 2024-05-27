import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logindto } from './auth.dto';
import { UserDto} from '../users/users.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('signin')
    @ApiOperation({ summary: 'Sign in user' })
    signIn(@Body() credential: logindto) {
        return this.authService.signIn(credential)
    }

    @Post('signup')
    @ApiOperation({summary: "Sign up user"})
    signUp(@Body() user: UserDto){
        return this.authService.signUp(user)
    }
}
