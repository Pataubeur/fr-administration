import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './associations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AssociationsService {

    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        private service: UsersService
    ) {}

    public async getAll(): Promise<string[]> {
        return ['oui', 'c\'est', 'moi'];
    }
    
    public async getAssociations(): Promise<Repository<Association>> {
        return this.repository;
    }
    
    public async getById(idToFind: number): Promise<Association> { 
        let associationById = await this.repository.findOne({
            where : { id: Equal(idToFind) }
        });
        return associationById;
    }

    public async getMembers(id: number): Promise<User[]> {
        let associationToGet = await this.getById(id);
        return associationToGet.users;
    }
    
    public async create(idUsers: number[], name: string) : Promise<Association> {
        let usersToCreate = []
        idUsers.forEach(id => {
            usersToCreate.push(this.service.getById(id));
        });
        let associationToCreate = this.repository.create({
            name: name,
            users: usersToCreate
        })
        await this.repository.save(associationToCreate);
        return associationToCreate;
    }
    
    public async put(id: number, idUsers: number[], name: string) : Promise<Association> {
        let associationToModify = await this.getById(id);
        if(idUsers !== undefined) {
            let usersToCreate = []
            idUsers.forEach(id => {
                usersToCreate.push(this.service.getById(id));
            });
            associationToModify.users = usersToCreate;
        }
        if(name !== undefined) {
            associationToModify.name = name;
        }
        await this.repository.save(associationToModify);
        return this.getById(id);
    }
    
    public async deleteById(id: number) : Promise<boolean> {
        let associationToDelete = await this.getById(id);
        let associationDeleted = await this.repository.delete(associationToDelete);
        return (associationDeleted !== null);
    }

}
