import { Injectable } from '@nestjs/common';

import{ User } from './user.entity';

const users : User[] = [
    {
    id:0,
    lastname:'Doe',
    firstname:'John',
    age: 23
    }
]

@Injectable()
export class UsersService {

    getAll(): string[] {
        return ['oui', 'c\'est', 'moi'];
    }

    getUsers(): User[] {
        return users;
    }

    getById(id: number): User {
        let userById = users.filter(user => +user.id === +id);
        if (userById.length === 0) {
            return undefined;
        }
        return userById[0];
    }

    create(lastname: string, firstname: string, age: number) {
        let id = users.length;
        let userToCreate = new User(id, lastname, firstname, age);
        users.push(userToCreate);
        return userToCreate;
    }

    put(id: number, lastname: string, firstname: string, age: number) : User {
        if(lastname !== undefined) {
            this.getById(id).lastname = lastname;
        }
        if(firstname !== undefined) {
            this.getById(id).firstname = firstname;
        }
        if(age !== undefined) {
            this.getById(id).age = age;
        }
        return this.getById(id);
    }

    deleteById(id: number) : boolean {
        let userToDelete = this.getById(id);
        let index = users.findIndex(user => user.id === userToDelete.id);
        let deletedUser = users.splice(index, 1);
        return (deletedUser.length !== 0);
    }

}
