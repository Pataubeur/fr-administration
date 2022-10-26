import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Controller('associations')
export class AssociationsController {

    constructor(private service: AssociationsService){}

    @Get('all')
    public getAll(): string[] {
        return this.service.getAll();
    }

    @Get()
    public getUsers(): Repository<Association> {
        return this.service.getAssociations();
    }

    @Get(':id')
    public async getById(@Param() parameter): Promise<Association> {
    let associationById = await this.service.getById(parameter.id);
        if (associationById === null) {
            throw new HttpException(`Pas d'utilisateur avec pour id ${parameter.id}`, HttpStatus.NOT_FOUND)
        }
        return associationById;
    }

    @Get(':id/members')
    public async getMembers(@Param() parameter): Promise<User[]> {
        return this.service.getMembers(parameter.id);
    }

    @Post()
    public async create(@Body() input: any): Promise<Association> {
        return this.service.create(input.userById, input.name);
    }

    @Put(':id')
    public async put(@Param() parameter, @Body() input) : Promise<Association> {
        return this.service.put(parameter.id, input.idUsers, input.name);
    }

    @Delete(':id')
    public async deleteById(@Param() parameter) : Promise<boolean>{
        return this.service.deleteById(parameter.id);
    }

}
