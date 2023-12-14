import { User } from "../models/user.model";
import { BaseResponse } from "./base.apis";

export type RegisterRequest = {
  nama: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterResponse = BaseResponse & {
  data: {
    user: Pick<User, "id" | "nama" | "email" | "phone">;
    token: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = BaseResponse & {
  data: {
    user: Pick<User, "id" | "nama" | "email" | "phone">;
    token: string;
  };
};

export type UpdateUserRequest = {
  nama?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export type GetUsersResponse = BaseResponse & {
  data: {
    users: Pick<User, "id" | "nama" | "email" | "phone">[];
  };
};
