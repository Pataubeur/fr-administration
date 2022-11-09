import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

import{ User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Get('all')
    public async getAll(): Promise<string[]> {
        return await this.service.getAll();
    }

    @Get()
    public async getUsers(): Promise<Repository<User>> {
        return await this.service.getUsers();
    }

    @Get(':id')
    public async getById(@Param() parameter): Promise<User> {
        let userById = await this.service.getById(parameter.id);
        if (userById === null) {
            throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return userById;
    }

    @Post()
    public async create(@Body() input: any): Promise<User> {
        return await this.service.create(input.lastname, input.firstname, input.age);
    }

    @Put(':id')
    public async put(@Param() parameter, @Body() input) : Promise<User> {
        return await this.service.put(parameter.id, input.lastname, input.firstname, input.age);
    }

    @Delete(':id')
    public async deleteById(@Param() parameter) : Promise<boolean> {
        return await this.service.deleteById(parameter.id);
    }


}
