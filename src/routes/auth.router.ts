import express from "express";
import { controller } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
