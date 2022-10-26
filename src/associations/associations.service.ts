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

    public getAll(): string[] {
        return ['oui', 'c\'est', 'moi'];
    }
    
    public getAssociations(): Repository<Association> {
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
    
    public async create(idUsers: number[], name: string) {
        let usersToCreate = []
        idUsers.forEach(id => {
            usersToCreate.push(this.service.getById(id));
        });
        let associationToCreate = await this.repository.create({
            name: name,
            users: usersToCreate
        })
        this.repository.save(associationToCreate);
        return associationToCreate;
    }
    
    public async put(id: number, idUsers: number[], name: string) : Promise<Association> {
        let associatinToModify = await this.getById(id);
        if(idUsers !== undefined) {
            let usersToCreate = []
            idUsers.forEach(id => {
                usersToCreate.push(this.service.getById(id));
            });
            associatinToModify.users = usersToCreate;
        }
        if(name !== undefined) {
            associatinToModify.name = name;
        }
        this.repository.save(associatinToModify);
        return this.getById(id);
    }
    
    public async deleteById(id: number) : Promise<boolean> {
        let associationToDelete = await this.getById(id);
        let associationDeleted = await this.repository.delete(associationToDelete);
        return (associationDeleted !== null);
    }

}
