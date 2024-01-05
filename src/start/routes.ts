import cors from "cors";
import express from "express";
import helmet from "helmet";
import authMiddleware from "../middlewares/auth.middleware";
import errorMiddleware from "../middlewares/error.middleware";
import loggerMiddleware from "../middlewares/logger.middleware";
import authRouter from "../routes/auth.router";
import userRouter from "../routes/user.router";

export default function (app: express.Express): void {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerMiddleware);
  app.use(errorMiddleware);
  app.use("/", authRouter);
  app.use(authMiddleware);
  app.use("/users", userRouter);
}
