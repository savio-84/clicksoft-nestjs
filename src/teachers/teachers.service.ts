/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AddStudentToRoomDto } from './dto/add-student-to-room.dto';
import { Teacher } from './entities/teacher.entity';
import { Room } from '../rooms/entities/room.entity';
import { Student } from '../students/entities/student.entity';




@Injectable()
export class TeachersService {

  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,

    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,

    @InjectConnection()
    private readonly connection: Connection

  ) { }

  async create({ name, email, registration, born }: CreateTeacherDto) {
    const teacher = new Teacher();
    teacher.name = name;
    teacher.email = email;
    teacher.registration = registration;
    teacher.born = born;

    const newTeacher = await this.teachersRepository.save(teacher);

    if (!newTeacher) {
      throw new Error('Failed to save teacher');
    }

    return newTeacher;
  }



  async findAll() {

    const teachers = await this.teachersRepository.find();

    if (!teachers) {
      throw new Error('Teachers not found');
    }

    return teachers;
  }

  async findOne(id: string) {
    const teacher = await this.teachersRepository.findOneOrFail({ id: id });
    return teacher;
  }

  async update(id: string, { name, email, registration, born }: UpdateTeacherDto) {
    const teacher = await this.teachersRepository.findOneOrFail({ id: id });
    teacher.name = name;
    teacher.email = email;
    teacher.registration = registration;
    teacher.born = born;

    const updatedTeacher = await this.teachersRepository.save(teacher);

    if (!updatedTeacher) {
      throw new Error('Failed to update teacher');
    }

    return updatedTeacher;
  }

  async remove(id: string) {
    await this.teachersRepository.delete({ id: id });
  }

  async addStudentToRoom({ roomId, studentId, teacherId }: AddStudentToRoomDto) {
    const teacher = await this.teachersRepository.findOneOrFail(teacherId);
    const room = await this.roomsRepository.findOneOrFail(roomId, { relations: ['students', 'owner'] });
    const student = await this.studentsRepository.findOneOrFail(studentId, { relations: ['rooms'] })

    if (teacher.id != room.owner.id) throw new Error('Teacher not allowed');
    if (room.students.includes(student)) throw new Error('Student already is in this room');
    if (room.students.length >= room.capacity) throw new Error('Exceeds the room capacity limit');

    room.students.push(student);
    const updatedRoom = this.connection.manager.save(room);
    return updatedRoom;
  }

  async removeStudent({ roomId, studentId, teacherId }: AddStudentToRoomDto) {
    const room = await this.roomsRepository.findOneOrFail(roomId, { relations: ['owner', 'students'] });
    const teacher = await this.teachersRepository.findOneOrFail(teacherId);

    if (room.owner.id != teacher.id) throw new Error('Teacher not allowed');

    room.students = room.students.filter((student) => student.id != studentId);

    const updatedRoom = await this.connection.manager.save(room);
    return updatedRoom;
  }

  async findRooms(id: string) {
    const teacher = await this.teachersRepository.findOneOrFail(id, { relations: ['rooms'] });

    return teacher.rooms;
  }
}
