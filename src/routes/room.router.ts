import express from "express";
import { controller } from "../controllers/room.controller";

const router = express.Router();

router.post("/", controller.createRoom);
router.get("/", controller.getRooms);

router.get("/:id", controller.getRoomById);

router.put("/:id", controller.updateRoomById);
router.delete("/:id", controller.deleteRoomById);

export default router;
