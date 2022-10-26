import { Injectable } from '@nestjs/common';
import{ User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
            @InjectRepository(User)
            private repository: Repository<User>
        ) {}

   public getAll(): string[] {
        return ['oui', 'c\'est', 'moi'];
    }

    public getUsers(): Repository<User> {
        return this.repository;
    }

    public async getById(idToFind: number): Promise<User> {
        let userById = await this.repository.findOne({
            where : { id: Equal(idToFind) }
        });
        return userById;
    }

    public async create(lastname: string, firstname: string, age: number) : Promise<User> {
        let userToCreate = await this.repository.create({
            lastname: lastname,
            firstname: firstname,
            age: age
        })
        this.repository.save(userToCreate);
        return userToCreate;
    }

    public async put(id: number, lastname: string, firstname: string, age: number) : Promise<User> {
        let userToModify = await this.getById(id);
        if(lastname !== undefined) {
            userToModify.lastname = lastname;
        }
        if(firstname !== undefined) {
            userToModify.lastname = lastname;
        }
        if(age !== undefined) {
            userToModify.lastname = lastname;
        }
        this.repository.save(userToModify);
        return this.getById(id);
    }

    public async deleteById(id: number) : Promise<boolean> {
        let userToDelete = await this.getById(id);
        let userDeleted = await this.repository.delete(userToDelete);
        return (userDeleted !== null);
    }

}
