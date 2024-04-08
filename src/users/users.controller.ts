import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}// inyección dependencia

    @Get()
    getUsers(){
        return this.usersService.getUsers();
    }
    @Get(':id')
    getUserById(@Param('id') id:string) {
        return this.usersService.getUserById(id)
    }
    @Post()
    @UseGuards()
    addUser(@Body() user: any){
        return this.usersService.addUser(user);
    }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: any) {
        return this.usersService.updateUser(id, user);
    }
    @Delete()
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}