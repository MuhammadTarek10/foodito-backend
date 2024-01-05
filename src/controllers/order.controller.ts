import { BaseResponse } from "../apis/base.apis";
import { OrderResponse, OrdersResponse } from "../apis/order.apis";
import { StatusCodes } from "../config/constants/status_codes";
import {
  ExpressHandler,
  ExpressHandlerWithParams,
} from "../config/types/types";
import { db } from "../data/dao/datasource.dao";
import { Validator } from "../utils/validator";

class OrderController {
  public createOrder: ExpressHandlerWithParams<
    { roomId: string; foodId: string },
    void,
    OrderResponse
  > = async (req, res) => {
    const userId = res.locals.userId;

    const { roomId, foodId } = req.params;
    if (!roomId || !foodId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing roomId",
      });

    const { error, value } = Validator.orderSchema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { id } = value;

    try {
      const order = await db.createOrder(id, userId, roomId, foodId);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getOrdersByRoomId: ExpressHandlerWithParams<
    { roomId: string },
    void,
    OrdersResponse
  > = async (req, res) => {
    const { roomId } = req.params;
    if (!roomId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing roomId",
      });

    try {
      const orders = await db.getOrderByRoomId(roomId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched Orders Successfully",
        data: orders,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getOrdersByFoodId: ExpressHandlerWithParams<
    { foodId: string },
    void,
    OrdersResponse
  > = async (req, res) => {
    const { foodId } = req.params;
    if (!foodId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing foodId",
      });

    try {
      const orders = await db.getOrderByFoodId(foodId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched Orders Successfully",
        data: orders,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getOrdersByUserId: ExpressHandler<void, OrdersResponse> = async (
    req,
    res
  ) => {
    const { userId } = res.locals.userId;

    try {
      const orders = await db.getOrderByUserId(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched Orders Successfully",
        data: orders,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getOrderById: ExpressHandlerWithParams<
    { id: string },
    void,
    OrderResponse
  > = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing id",
      });

    try {
      const order = await db.getOrderById(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Get order successfully",
        data: order,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public deleteOrder: ExpressHandlerWithParams<
    { id: string },
    void,
    BaseResponse
  > = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing id",
      });

    try {
      const order = await db.getOrderById(id);
      if (!order)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Order not found",
        });

      await db.deleteOrder(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Delete order successfully",
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };
}

export const controller = new OrderController();
