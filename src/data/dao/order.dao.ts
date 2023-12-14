import { Order } from "../../models/order.model";

export interface OrderDao {
  createOrder(
    id: string,
    userId: string,
    roomId: string,
    foodId: string
  ): Promise<Order>;

  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrderByUserId(userId: string): Promise<Order[] | undefined>;
  getOrderByRoomId(roomId: string): Promise<Order[] | undefined>;
  getOrderByFoodId(foodId: string): Promise<Order[] | undefined>;

  updateOrder(id: string, order: Order): Promise<Order | undefined>;

  deleteOrder(id: string): Promise<boolean>;
}
