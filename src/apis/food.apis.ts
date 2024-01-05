import { Food } from "../models/food.model";
import { BaseResponse } from "./base.apis";

export type FoodRequest = {
  id?: string;
  name?: string;
  price?: number;
  restaurant?: string;
};

export type FoodResponse = BaseResponse & {
  data: Food;
};

export type FoodsResponse = BaseResponse & {
  data: Food[];
};
