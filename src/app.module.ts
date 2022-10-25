import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsService } from './associations/associations.service';
import { AssociationsController } from './associations/associations.controller';
import { AssociationsModule } from './associations/associations.module';

@Module({
  imports: [UsersModule, AssociationsModule],
  controllers: [AppController, AssociationsController],
  providers: [AppService, AssociationsService],
})
export class AppModule {}
