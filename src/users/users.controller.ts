import { Controller, Get, Put, Delete, Param, Body, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from './users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Get all users (admin only)' })
    @Roles(Role.Admin) 
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
    @ApiOperation({ summary: 'Get one user by id' })
    getUserById(@Param('id') id:string) { 
        return this.usersService.getUserById(id)
    }
   
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Modify user by id' })
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() user: Partial<UserDto>) {
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id'})
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
