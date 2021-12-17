import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Room } from '../../rooms/entities/room.entity';

@Entity({ name: 'teachers' })
export class Teacher {
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

  @OneToMany(() => Room, (room) => room.owner, {
    cascade: true,
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
