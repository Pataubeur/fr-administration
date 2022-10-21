import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';

import{ User } from './user.entity';

const users : User[] = [
    {
    id:0,
    lastname:'Doe',
    firstname:'John'
    }
]

@Controller('users')
export class UsersController {

@Get('all')
getAll(): string[] {
    return ['oui', 'c\'est', 'moi'];
}

@Get()
getUsers(): User[] {
    return users;
}

@Get(':id')
getById(@Param() parameter): User {
    let userById = users.filter(user => +user.id === +parameter.id);
    if (userById.length === 0) {
        throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
    }
    return userById[0];
}

@Post()
create(@Body() input: any): User {
    let id = users.length;
    let userToCreate = new User(id, input.lastname, input.firstname);
    users.push(userToCreate);
    return userToCreate;
}

@Put(':id')
put(@Param() parameter, @Body() input) : User {
    if(input.lastname !== undefined) {
        this.getById(parameter).lastname = input.lastname;
    }
    if(input.firstname !== undefined) {
        this.getById(parameter).firstname = input.firstname;
    }
    return this.getById(parameter);
}

@Delete(':id')
deleteById(@Param() parameter) : boolean {
    let userToDelete = this.getById(parameter);
    let index = users.findIndex(user => user.id === userToDelete.id);
    let deletedUser = users.splice(index, 1);
    return (deletedUser.length !== 0);
}


}
