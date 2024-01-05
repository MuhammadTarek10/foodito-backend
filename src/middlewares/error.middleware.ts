import { ErrorRequestHandler } from "express";
import { StatusCodes } from "../config/constants/status_codes";

export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  console.log(`Uncaught exception: ${err}`);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Oops, an unexpected error occurred, please try again");
};

export default errorMiddleware;
