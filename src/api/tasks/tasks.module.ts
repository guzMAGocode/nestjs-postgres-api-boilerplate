import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository]),
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}
