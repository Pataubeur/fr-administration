import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import{ User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Get('all')
    public getAll(): string[] {
        return this.service.getAll();
    }

    @Get()
    public getUsers(): Repository<User> {
        return this.service.getUsers();
    }

    @Get(':id')
    public async getById(@Param() parameter): Promise<User> {
        let userById = this.service.getById(parameter.id);
        if (userById === null) {
            throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return userById;
    }

    @Post()
    public async create(@Body() input: any): Promise<User> {
        return this.service.create(input.lastname, input.fistname, input.age);
    }

    @Put(':id')
    public async put(@Param() parameter, @Body() input) : Promise<User> {
        return this.service.put(parameter.id, input.lastname, input.firstname, input.age);
    }

    @Delete(':id')
    public async deleteById(@Param() parameter) : Promise<boolean> {
        return this.service.deleteById(parameter.id);
    }


}
