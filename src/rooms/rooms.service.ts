/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Teacher } from '../teachers/entities/teacher.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,

    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) { }

  async create({ number, capacity, availability, ownerId }: CreateRoomDto) {
    if (!ownerId) throw new Error('Owner id required!');
    const teacher = await this.teachersRepository.findOneOrFail(ownerId);
    const room = new Room();
    room.number = number;
    room.capacity = capacity;
    room.availability = availability;
    room.owner = teacher;

    const newRoom = await this.roomsRepository.save(room);

    if (!newRoom) throw new Error('Failed to save room');

    return newRoom;
  }

  async findAll() {
    const rooms = await this.roomsRepository.find({ relations: ['owner', 'students'] });

    if (!rooms) throw new Error('Rooms not found!');
    return rooms;
  }

  async findOne(id: string) {
    const room = await this.roomsRepository.findOneOrFail(id);
    return room;
  }

  async findStudents(id: string) {
    const room = await this.roomsRepository.findOneOrFail(id, { relations: ['students'] });
    return room.students;
  }

  async update(id: string, { number, capacity, availability, ownerId }: UpdateRoomDto) {

    const room = await this.roomsRepository.findOneOrFail(id, { relations: ['owner'] });
    if (room.owner.id != ownerId) throw new Error('Teacher not allowed');

    room.number = number;
    room.capacity = capacity;
    room.availability = availability;
    // room.owner = owner;

    const updatedRoom = await this.roomsRepository.save(room);

    if (!updatedRoom) throw new Error('Failed to update room');
    return room;
  }

  async remove(id: string) {
    await this.roomsRepository.delete({ id: id });
  }
}
