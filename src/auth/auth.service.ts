import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private service: UsersService,
        private jwtService: JwtService
        ){}

    public async validateUser(id: number, password: string) : Promise<User> {
        let user = await this.service.getById(id)
        if(user.password === password) {
            return user;
        } else {
            return undefined;
        }
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
