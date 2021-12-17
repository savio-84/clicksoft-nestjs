import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryColumn()
  id: string;

  @Column()
  number: number;

  @Column()
  capacity: number;

  @Column()
  availability: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.rooms, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: Teacher;

  @ManyToMany(() => Student, (student) => student.rooms, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  students: Student[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
