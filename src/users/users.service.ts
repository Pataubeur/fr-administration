// Service : s'occupe des méthodes

import { Injectable } from '@nestjs/common';
import { User } from './user.entity';


const users : User[] = [
    {
    // Initialisation d'un premier utilisateur
    id:0,
    lastname:'Doe',
    firstname:'John',
    age: 23
    }
]

@Injectable()
export class UsersService {

    // Implémentation des méthodes de la classe User

    getAll(): string[] {
        return ['oui', 'c\'est', 'moi'];
    }

    getUsers(): User[] {
        return users;
    }

    getById(parameter: number): User {
        let userById = users.filter(user => +user.id === +parameter);
        return userById[0];
    }

    create(lastname: string, firstname: string, age: number): User {
        let id = users.length;
        let userToCreate = new User(id, lastname, firstname, age);
        users.push(userToCreate);
        return userToCreate;
    }
    
    put(lastname: string, firstname: string, age: number,id: number) : User {
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
        let index = users.findIndex(user => user.id === id);
        let deletedUser = users.splice(index, 1);
        return (deletedUser.length !== 0);
    }
}


