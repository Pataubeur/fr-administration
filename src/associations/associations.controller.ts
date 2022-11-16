import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {

    constructor(private service: AssociationsService){}

    @Get('all')
    public async getAll(): Promise<string[]> {
        return await this.service.getAll();
    }

    @Get()
    public async getUsers(): Promise<Association[]> {
        return await this.service.getAssociations();
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
        return await this.service.getMembers(parameter.id);
    }

    @Post()
    public async create(@Body() input: any): Promise<Association> {
        return await this.service.create(input.idUsers, input.name);
    }

    @Put(':id')
    public async put(@Param() parameter, @Body() input) : Promise<Association> {
        return await this.service.put(parameter.id, input.idUsers, input.name);
    }

    @Delete(':id')
    public async deleteById(@Param() parameter) : Promise<boolean>{
        return await this.service.deleteById(parameter.id);
    }

}
