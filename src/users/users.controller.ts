import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';

import{ User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

constructor(private service: UsersService){}

@Get('all')
getAll(): string[] {
    return this.service.getAll();
}

@Get()
getUsers(): User[] {
    return this.service.getUsers();
}

@Get(':id')
getById(@Param() parameter): User {
    let userById = this.service.getById(parameter.id);
    if (userById === undefined) {
        throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
    }
    return userById;
}

@Post()
create(@Body() input: any): User {
    return this.service.create(input.lastname, input.fistname, input.age);
}

@Put(':id')
put(@Param() parameter, @Body() input) : User {
    return this.service.put(parameter.id, input.lastname, input.firstname, input.age);
}

@Delete(':id')
deleteById(@Param() parameter) : boolean {
    return this.service.deleteById(parameter.id);
}


}
