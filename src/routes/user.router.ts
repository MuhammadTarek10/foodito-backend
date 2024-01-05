import express from "express";
import { controller } from "../controllers/user.controller";
const router = express.Router();

router.get("/", controller.getUserByToken);
router.get("/:id", controller.getUserById);
router.get("/users", controller.getUsers);

export default router;
