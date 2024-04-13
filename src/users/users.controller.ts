import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}// inyección dependencia

    @Get()
    @Roles(Role.Admin) // ensure which metadata to look for in the guards
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page: number, @Query('limit') limit: number){
        if (page && limit) {
            return this.usersService.getUsers(page, limit);
        }
        return this.usersService.getUsers(1, 3);
    }
    @Get(':id')
    getUserById(@Param('id') id:string) {
        return this.usersService.getUserById(id)
    }
   
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: any) {
        return this.usersService.updateUser(id, user);
    }
    @Delete()
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
