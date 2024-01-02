import { ErrorRequestHandler } from "express";
import { StatusCodes } from "../config/constants/status_codes";

export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  console.log(`Uncaught exception: ${err}`);

  const errorMessage =
    process.env.NODE_ENV === "production"
      ? "Oops, an unexpected error occurred, please try again"
      : err.message || "Internal Server Error";

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: errorMessage,
  });
};

export default errorMiddleware;
