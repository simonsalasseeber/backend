import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from './users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}// inyección dependencia

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin) // ensure which metadata to look for in the guards
    @UseGuards(AuthGuard, RolesGuard)
    @ApiQuery({name: 'page', required: false})
    @ApiQuery({name: 'limit', required: false})
    getUsers(@Query('page') page: number, @Query('limit') limit: number){
        if (page && limit) {
            return this.usersService.getUsers(page, limit);
        }
        return this.usersService.getUsers(1, 5);
    }
    @Get(':id')
    getUserById(@Param('id') id:string) { // parseUUID?
        return this.usersService.getUserById(id)
    }
   
    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: Partial<UserDto>) {
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
