import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './associations.entity';

const associations : Association[] = [
    {
    id:0,
    idUsers: [0, 1, 2, 3],
    name:'Utilisateurs'
    }
]

@Injectable()
export class AssociationsService {

    constructor(
        private service: UsersService
    ) {}

    getAll(): string[] {
        return ['oui', 'c\'est', 'moi'];
    }
    
    getAssociations(): Association[] {
        return associations;
    }
    
    getById(id: number): Association {
        let associationById = associations.filter(association => +association.id === +id);
        if (associationById.length === 0) {
            return undefined;
        }
        return associationById[0];
    }

    getMembers(id: number): User[] {
        //console.log('Entrée');
        let associationById = this.getById(id);
        let usersByAssociation = [];
        //console.log('Boucle');
        associationById.idUsers.forEach(idUser => {
            usersByAssociation.push(this.service.getById(idUser));
            //console.log(usersByAssociation);
        });
        return usersByAssociation;
    }
    
    create(idUsers: number[], name: string) {
        let id = associations.length;
        let associationToCreate = new Association(id, idUsers, name);
        associations.push(associationToCreate);
        return associationToCreate;
    }
    
    put(id: number, idUsers: number[], name: string) : Association {
        if(idUsers !== undefined) {
            this.getById(id).idUsers = idUsers;
        }
        if(name !== undefined) {
            this.getById(id).name = name;
        }
        return this.getById(id);
    }
    
    deleteById(id: number) : boolean {
        let associationToDelete = this.getById(id);
        let index = associations.findIndex(association => association.id === associationToDelete.id);
        let deletedAssociation = associations.splice(index, 1);
        return (deletedAssociation.length !== 0);
    }

}
