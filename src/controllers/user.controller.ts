import { BaseResponse } from "../apis/base.apis";
import {
  GetMyFoodResponse,
  GetMyOrdersResponse,
  GetMyRoomsResponse,
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateUserRequest,
  UserResponse,
} from "../apis/user.apis";
import { StatusCodes } from "../config/constants/status_codes";
import {
  ExpressHandler,
  ExpressHandlerWithParams,
} from "../config/types/types";
import { db } from "../data/dao/datasource.dao";
import { AuthHelper } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";
import { Validator } from "../utils/validator";

class UserController {
  public register: ExpressHandler<RegisterRequest, RegisterResponse> = async (
    req,
    res
  ) => {
    const { error, value } = Validator.registerSchema.validate(req.body);

    if (error)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });

    const { id, name, email, password, phone } = value;
    try {
      if (await db.getUserByEmail(email))
        return res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: "User already exists",
        });

      const user = {
        id: id,
        name: name,
        email: email,
        password: password,
        phone: phone,
      };

      await db.createUser(user);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User Registered Successfully",
        data: {
          user: user,
          token: AuthHelper.generateAuthToken(user.id),
        },
      });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public login: ExpressHandler<LoginRequest, LoginResponse> = async (
    req,
    res
  ) => {
    const { error, value } = Validator.loginSchema.validate(req.body);

    if (error)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });

    const { email, password } = value;
    try {
      const user = await db.getUserByEmail(email);
      if (!user || user.password != password)
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid email or password",
        });

      res.status(StatusCodes.OK).json({
        success: true,
        message: email,
        data: {
          user: user,
          token: AuthHelper.generateAuthToken(user.id),
        },
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getUserByToken: ExpressHandler<void, LoginResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    try {
      const user = (await db.getUserById(userId)) as User;
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User Fetched Successfully",
        data: {
          user: user,
          token: AuthHelper.generateAuthToken(user.id),
        },
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getUsers: ExpressHandler<void, GetUsersResponse> = async (
    req,
    res
  ) => {
    try {
      const users = await db.getUsers();
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Users Fetched Successfully",
        data: users,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getUserById: ExpressHandlerWithParams<
    { id: string },
    void,
    UserResponse
  > = async (req, res) => {
    const id = req.params.id;
    if (!id)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid id",
      });
    try {
      const user = await db.getUserById(id);
      if (!user)
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "User not Found",
        });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User Fetched Successfully",
        data: user,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public updateUser: ExpressHandler<UpdateUserRequest, UserResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    try {
      const { name, email, phone } = req.body;
      const user = (await db.getUserById(userId)) as User;

      const editedUser = {
        id: user.id,
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
      };

      await db.updateUser(editedUser);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User Updated Successfully",
        data: editedUser,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public deleteUserById: ExpressHandler<void, BaseResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    try {
      await db.deleteUser(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getMyFood: ExpressHandler<void, GetMyFoodResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    try {
      const food = await db.getFoodsByUserId(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Food Fetched Successfully",
        data: food,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getMyRooms: ExpressHandler<void, GetMyRoomsResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    try {
      const rooms = await db.getRoomsByUserId(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Rooms Fetched Successfully",
        data: rooms,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };

  public getMyOrders: ExpressHandler<void, GetMyOrdersResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    try {
      const orders = await db.getOrderByUserId(userId);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Orders Fetched Successfully",
        data: orders,
      });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `${e}`,
      });
    }
  };
}

export const controller = new UserController();
