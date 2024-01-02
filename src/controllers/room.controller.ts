import { RoomRequest, RoomResponse, RoomsResponse } from "../apis/room.apis";
import { StatusCodes } from "../config/constants/status_codes";
import {
  ExpressHandler,
  ExpressHandlerWithParams,
} from "../config/types/types";
import { db } from "../data/dao/datasource.dao";
import { RoomValidator } from "../utils/room.validator";

class RoomController {
  public createRoom: ExpressHandler<RoomRequest, RoomResponse> = async (
    req,
    res
  ) => {
    const { error, value } = RoomValidator.roomSchema.validate(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });

    const { id, name, code } = value;
    try {
      const room = {
        id: id,
        name: name,
        code: code,
      };

      await db.createRoom(room);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Room Created Successfully",
        data: room,
      });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getRooms: ExpressHandler<void, RoomsResponse> = async (req, res) => {
    try {
      const rooms = await db.getRooms();
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Rooms Fetched Successfully",
        data: rooms,
      });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getRoomById: ExpressHandlerWithParams<
    { roomId: string },
    void,
    RoomResponse
  > = async (req, res) => {
    const roomId = req.params.roomId;
    if (!roomId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid id",
      });

    try {
      const room = await db.getRoomById(roomId);
      if (!room)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Room not Found",
        });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Room Fetched Successfully",
        data: room,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public updateRoomById: ExpressHandlerWithParams<
    { roomId: string },
    RoomRequest,
    RoomResponse
  > = async (req, res) => {
    const roomId = req.params.roomId;
    if (!roomId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid id",
      });

    const { name, code } = req.body;

    try {
      const room = await db.getRoomById(roomId);
      if (!room)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Room not Found",
        });

      const editedRoom = {
        id: room.id,
        name: name || room.name,
        code: code || room.code,
      };

      await db.updateRoom(editedRoom);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Room Updated Successfully",
        data: room,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public deleteRoomById: ExpressHandlerWithParams<
    { roomId: string },
    void,
    RoomResponse
  > = async (req, res) => {
    const roomId = req.params.roomId;
    if (!roomId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid id",
      });

    try {
      const room = await db.getRoomById(roomId);
      if (!room)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Room not Found",
        });

      await db.deleteRoom(roomId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Room Deleted Successfully",
        data: room,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };
}

export const controller = new RoomController();
