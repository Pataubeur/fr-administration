import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Controller('associations')
export class AssociationsController {

    constructor(private service: AssociationsService){}

    @Get('all')
    getAll(): string[] {
        return this.service.getAll();
    }

    @Get()
    getUsers(): Association[] {
        return this.service.getAssociations();
    }

    @Get(':id')
    getById(@Param() parameter): Association {
    let associationById = this.service.getById(parameter.id);
        if (associationById === undefined) {
            throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return associationById;
    }

    @Get(':id/members')
    getMembers(@Param() parameter): User[] {
        return this.service.getMembers(parameter.id);
    }

    @Post()
    create(@Body() input: any): Association {
        return this.service.create(input.userById, input.name);
    }

    @Put(':id')
    put(@Param() parameter, @Body() input) : Association {
        return this.service.put(parameter.id, input.idUsers, input.name);
    }

    @Delete(':id')
    deleteById(@Param() parameter) : boolean {
        return this.service.deleteById(parameter.id);
    }

}
