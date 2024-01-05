import express from "express";
import { controller } from "../controllers/food.controller";

const router = express.Router();

router.post("/:roomId", controller.createFood);

router.get("/:roomId", controller.getFoodsByRoomId);
router.get("/:id", controller.getFoodById);
router.get("/user/:userId", controller.getFoodsByUserId);

router.put("/:id", controller.updateFood);
router.delete("/:id", controller.deleteFood);

export default router;
