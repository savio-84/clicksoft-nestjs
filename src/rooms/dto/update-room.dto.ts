import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  number: number;
  capacity: number;
  availability: boolean;
  ownerId: string;
}
