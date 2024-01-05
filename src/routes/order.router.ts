import express from "express";
import { controller } from "../controllers/order.controller";

const router = express.Router();

router.post("/room/:roomId/:foodId", controller.createOrder);

router.get("/room/:roomId", controller.getOrdersByRoomId);
router.get("/:id", controller.getOrderById);
router.get("food/:foodId", controller.getOrdersByFoodId);
router.get("user/:id", controller.getOrdersByUserId);

router.put("/:id", (req, res) => {});
router.delete("/:id", controller.deleteOrder);

export default router;
