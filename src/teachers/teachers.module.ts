/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from '../rooms/rooms.module';
import { Room } from '../rooms/entities/room.entity';
import { Teacher } from './entities/teacher.entity'
import { Student } from '../students/entities/student.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Room, Student]), RoomsModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule { }
