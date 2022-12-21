import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private service: UsersService){}

    public async validateUser(id: number, password: string) : Promise<User> {
        let user = await this.service.getById(id)
        if(user.password === password) {
            return user;
        } else {
            return undefined;
        }
    }

}
