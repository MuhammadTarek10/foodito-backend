import { Order } from "../models/order.model";
import { BaseResponse } from "./base.apis";

export type OrderRequest = {
  id: string;
  foodId: string;
  comment?: string;
};

export type OrderResponse = BaseResponse & {
  data: Order;
};

export type OrdersResponse = BaseResponse & {
  data: Order[];
};
