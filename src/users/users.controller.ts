import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
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
    addUser(@Body() user: any){
        return this.usersService.addUser(user);
    }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: any) {
        return this.usersService.updateUser(id, user);
    }
    @Delete()
    // @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
