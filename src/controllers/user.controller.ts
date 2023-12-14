import { BaseRequest } from "../apis/base.apis";
import {
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../apis/user.apis";
import {
  ExpressHandler,
  ExpressHandlerWithParams,
} from "../config/types/types";
import { DataSource, db } from "../data/dao/datasource.dao";

class UserController {
  private db: DataSource;

  constructor() {
    this.db = db;
  }

  public register: ExpressHandler<RegisterRequest, RegisterResponse> = async (
    req,
    res
  ) => {
    const { nama, email, password, phone } = req.body;
  };

  public login: ExpressHandler<LoginRequest, LoginResponse> = async (
    req,
    res
  ) => {};

  public getUserByToken: ExpressHandler<BaseRequest, LoginResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
  };

  public getUsers: ExpressHandler<BaseRequest, GetUsersResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
  };

  public getUserById: ExpressHandlerWithParams<
    { id: string },
    BaseRequest,
    GetUsersResponse
  > = async (req, res) => {
    const id = req.params.id;
  };

  

  public updateUser: ExpressHandler<BaseRequest, GetUsersResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
  };

  public deleteUser: ExpressHandler<BaseRequest, GetUsersResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
  };
}

export const controller = new UserController();
