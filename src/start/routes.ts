import cors from "cors";
import express from "express";
import asyncHandler from "express-async-handler";
import helmet from "helmet";
import { AuthHelper } from "../middlewares/auth.middleware";
import errorMiddleware from "../middlewares/error.middleware";
import loggerMiddleware from "../middlewares/logger.middleware";
import authRouter from "../routes/auth.router";
import foodRouter from "../routes/food.router";
import orderRouter from "../routes/order.router";
import roomRouter from "../routes/room.router";
import userRouter from "../routes/user.router";

export default function (app: express.Express): void {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(loggerMiddleware);
  app.use(errorMiddleware);

  app.use("/", asyncHandler(authRouter));
  app.use(AuthHelper.jwtMiddleware);

  app.use("/users", asyncHandler(userRouter));
  app.use("/rooms", asyncHandler(roomRouter));
  app.use("/foods", asyncHandler(foodRouter));
  app.use("/orders", asyncHandler(orderRouter));
}
