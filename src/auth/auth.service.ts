import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {

    public async validateUser(id: number, password: string) : Promise<User> {
        /** To be implemented **/
    }

}
