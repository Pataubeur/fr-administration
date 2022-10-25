import { Injectable } from '@nestjs/common';
import { Association } from './associations.entity';

const associations : Association[] = [
    {
    id:0,
    idUsers: [1, 2, 3, 4],
    name:'Utilisateurs'
    }
]

@Injectable()
export class AssociationsService {

    

}
