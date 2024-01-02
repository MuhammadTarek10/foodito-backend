import { Room } from "../models/room.model";
import { BaseResponse } from "./base.apis";

export type RoomRequest = {
  id?: string;
  name?: string;
  code?: string;
};

export type RoomResponse = BaseResponse & {
  data: Room;
};

export type RoomsResponse = BaseResponse & {
  data: Room[];
};
