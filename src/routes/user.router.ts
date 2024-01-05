import express from "express";
import { controller } from "../controllers/user.controller";
const router = express.Router();

router.get("/", controller.getUsers);

router.get("/my", controller.getUserByToken);
router.get("/:id", controller.getUserById);

router.get("/food", controller.getMyFood);
router.get("/rooms", controller.getMyRooms);
router.get("/orders", controller.getMyOrders);

router.put("/", controller.updateUser);
router.delete("/", controller.deleteUserById);

export default router;
