import express from "express";
import { controller } from "../controllers/user.controller";
const router = express.Router();

router.get("/users", controller.getUsers);

router.get("/", controller.getUserByToken);
router.get("/:id", controller.getUserById);

// router.get("/:id/food", controller.getMyFood);
// router.get("/:id/rooms", controller.getMyRooms);
// router.get("/:id/orders", controller.getMyOrders);

router.put("/", controller.updateUser);
router.delete("/", controller.deleteUser);

export default router;
