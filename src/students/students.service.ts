/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  // private studentsRepository: Repository<Student> = getRepository(Student);

  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,

    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>
  ) { }

  async create({ name, email, registration, born, }: CreateStudentDto) {
    const student = new Student();
    student.name = name;
    student.email = email;
    student.registration = registration;
    student.born = born;

    const newStudent = await this.studentsRepository.save(student);
    return newStudent;
  }

  async findAll() {
    const students = await this.studentsRepository.find({ relations: ['rooms'] });

    if (!students) {
      throw new Error('Students not found!');
    }

    return students;
  }

  async findOne(id: string) {
    const student = await this.studentsRepository.findOneOrFail(id, { relations: ['rooms'] });
    return student;
  }

  async findRooms(id: string) {
    const student = await this.studentsRepository.findOneOrFail(id, { relations: ['rooms'] });

    return student.rooms;
  }

  async update(
    id: string,
    { name, email, registration, born }: UpdateStudentDto,
  ) {
    const student = await this.studentsRepository.findOneOrFail(id);
    student.name = name;
    student.email = email;
    student.registration = registration;
    student.born = born;

    const updatedStudent = await this.studentsRepository.save(student);

    if (!updatedStudent) {
      throw new Error('Failed to update student!');
    }

    return updatedStudent;
  }

  async remove(id: string) {
    await this.studentsRepository.delete(id);
  }
}
