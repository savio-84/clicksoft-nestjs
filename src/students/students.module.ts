/* eslint-disable */
import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Room])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule { }
