import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

@Module({
    controllers: [AssociationsController],
    providers: [AssociationsService],
    imports: [UsersModule]
})
export class AssociationsModule {}
