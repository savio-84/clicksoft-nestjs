import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Room } from '../../rooms/entities/room.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  registration: string;

  @Column()
  born: Date;

  @ManyToMany(() => Room, (room) => room.students, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  rooms: Room[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
