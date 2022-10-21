import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    // Constructeur pour l'appelle de service
    constructor(
        private service: UsersService
    ) {
    }

    @Get('all')
    getAll(): string[] {
        return this.service.getAll();
    }

    @Get()
    getUsers(): User[] {
        return this.service.getUsers();
    }

    @Get(':id')
    getById(@Param() parameter): User {
        let user_ = this.service.getById(parameter);
        if (user_===undefined) {
            throw new HttpException(`Pas d'utilisateur avec pour id ${parameter}`, HttpStatus.NOT_FOUND)
        }else{
            return user_;
        }
    }

    @Post()
    create(@Body() input: any): User {
        return this.service.create(input.lastname, input.firstname,input.age)
    }

    @Put(':id')
    put(@Param() parameter, @Body() input) : User {
       return this.service.put(input.lastname, input.firstname, input.age, parameter);
    }

    @Delete(':id')
    deleteById(@Param() parameter) : boolean {
        return this.service.deleteById(parameter);
    }

}

