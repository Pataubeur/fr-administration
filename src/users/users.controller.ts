import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import{ User } from './user.entity';
import { UsersService } from './users.service';
import { UserInput } from './user_input.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService){}

//    @Get('all')
//    public async getAll(): Promise<string[]> {
//        return await this.service.getAll();
//    }

    @Get()
    public async getAll(): Promise<User[]> {
        return await this.service.getAll();
    }

    @Get(':id')
    public async getById(@Param() parameter): Promise<User> {
        let userById = await this.service.getById(parameter.id);
        if (userById === null) {
            throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return userById;
    }


    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    @Post()
    public async create(@Body() input: UserInput): Promise<User> {
        return await this.service.create(input.lastname, input.firstname, input.age, input.password);
    }

    @Put(':id')
    public async put(@Param() parameter, @Body() input) : Promise<User> {
        return await this.service.put(parameter.id, input.lastname, input.firstname, input.age, input.password);
    }

    @Delete(':id')
    public async deleteById(@Param() parameter) : Promise<boolean> {
        return await this.service.deleteById(parameter.id);
    }


}
