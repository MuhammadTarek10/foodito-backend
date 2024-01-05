import { Food } from "../models/food.model";
import { Order } from "../models/order.model";
import { Room } from "../models/room.model";
import { User } from "../models/user.model";
import { BaseResponse } from "./base.apis";

export type RegisterRequest = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterResponse = BaseResponse & {
  data: {
    user: Pick<User, "id" | "name" | "email" | "phone">;
    token: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = BaseResponse & {
  data: {
    user: Pick<User, "id" | "name" | "email" | "phone">;
    token: string;
  };
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
  phone?: string;
};

export type GetUsersResponse = BaseResponse & {
  data: Pick<User, "id" | "name" | "email" | "phone">[];
};

export type UserResponse = BaseResponse & {
  data: Pick<User, "id" | "name" | "email" | "phone">;
};

export type GetMyFoodResponse = BaseResponse & {
  data: Food[];
};

export type GetMyRoomsResponse = BaseResponse & {
  data: Room[];
};

export type GetMyOrdersResponse = BaseResponse & {
  data: Order[];
};
