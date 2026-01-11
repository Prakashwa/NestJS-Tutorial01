import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /*
    GET /users
    POST /users
    GET /users/:id
    PATCH /users/:id
    DELETE /users/:id
    */

    @Get() // GET /users or GET /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }

    @Get('interns') // GET /users/interns
    findInterns(){
        return [];
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        const user = this.usersService.findOne(+id);
        return user;
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) CreateUserDto: CreateUserDto){
        const newUser = this.usersService.create(CreateUserDto);
        return newUser;
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/:id
    remove(@Param('id', ParseIntPipe) id: number){
        return this.usersService.remove(id);
    }
}