/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Teacher, Student])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule { }
