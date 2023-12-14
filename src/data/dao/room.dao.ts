import { Room } from "../../models/room.model";

export interface RoomDao {
  createRoom(room: Room): Promise<Room>;

  getRooms(): Promise<Room[]>;
  getRoomById(id: string): Promise<Room | undefined>;

  updateRoom(id: string, room: Room): Promise<Room | undefined>;

  deleteRoom(id: string): Promise<boolean>;
}
