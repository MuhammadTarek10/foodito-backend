import { BaseResponse } from "../apis/base.apis";
import { FoodRequest, FoodResponse, FoodsResponse } from "../apis/food.apis";
import { StatusCodes } from "../config/constants/status_codes";
import { ExpressHandlerWithParams } from "../config/types/types";
import { db } from "../data/dao/datasource.dao";
import { Validator } from "../utils/validator";

class FoodController {
  public createFood: ExpressHandlerWithParams<
    { roomId: string },
    FoodRequest,
    FoodResponse
  > = async (req, res) => {
    const { roomId } = req.params;
    if (!roomId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing roomId",
      });

    const { error, value } = Validator.foodSchema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { id, name, price, restaurant } = value;
    const food = {
      id: id,
      name: name,
      price: price,
      restaurant: restaurant,
    };

    try {
      await db.createFood(id, roomId, food);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Create food successfully",
        data: food,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getFoodsByRoomId: ExpressHandlerWithParams<
    { roomId: string },
    void,
    FoodsResponse
  > = async (req, res) => {
    const { roomId } = req.params;
    if (!roomId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing roomId",
      });

    try {
      const foods = await db.getFoodsByRoomId(roomId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched Food Successfully",
        data: foods,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getFoodById: ExpressHandlerWithParams<
    { id: string },
    void,
    FoodResponse
  > = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing id",
      });

    try {
      const food = await db.getFoodById(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Get food successfully",
        data: food,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getFoodsByUserId: ExpressHandlerWithParams<
    { userId: string },
    void,
    FoodsResponse
  > = async (req, res) => {
    const { userId } = req.params;
    if (!userId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing userId",
      });

    try {
      const foods = await db.getFoodsByUserId(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched Food Successfully",
        data: foods,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public updateFood: ExpressHandlerWithParams<
    { id: string },
    FoodRequest,
    FoodResponse
  > = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Missing id",
      });

    const { error, value } = Validator.foodSchema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { name, price, restaurant } = value;

    try {
      const food = await db.getFoodById(id);
      if (!food)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Food not found",
        });

      const editedFood = {
        id: food.id,
        name: name || food.name,
        price: price || food.price,
        restaurant: restaurant || food.restaurant,
      };

      await db.updateFood(editedFood);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Update food successfully",
        data: food,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public deleteFood: ExpressHandlerWithParams<
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
      const food = await db.getFoodById(id);
      if (!food)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Food not found",
        });

      await db.deleteFood(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Delete food successfully",
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };
}

export const controller = new FoodController();
