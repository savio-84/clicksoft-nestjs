/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AddStudentToRoomDto } from './dto/add-student-to-room.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }


  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Get('/rooms/:id')
  findRooms(@Param('id') id: string) {
    return this.teachersService.findRooms(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete('/manageRooms')
  removeStudentFromRoom(@Body() data: AddStudentToRoomDto) {
    return this.teachersService.removeStudent(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }

  @Post('/manageRooms')
  addStudentToRoom(@Body() data: AddStudentToRoomDto) {
    return this.teachersService.addStudentToRoom(data);
  }

}
