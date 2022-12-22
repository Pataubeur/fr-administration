import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private service: UsersService,
        private jwtService: JwtService
        ){}

    public async validateUser(id: number, password: string) : Promise<User> {
        let user = await this.service.getById(id)

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        if(await bcrypt.compare(user.password, hash)) {
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
