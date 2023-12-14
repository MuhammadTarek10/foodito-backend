import { Food } from "../../models/food.model";
import { Order } from "../../models/order.model";
import { Room } from "../../models/room.model";
import { User } from "../../models/user.model";

export interface UserDao {
  createUser(user: User): Promise<User>;

  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | undefined>;

  getMyFood(id: string): Promise<Food[] | undefined>;
  getMyRooms(id: string): Promise<Room[] | undefined>;
  getMyOrders(id: string): Promise<Order[] | undefined>;

  updateUser(id: string, user: User): Promise<User | undefined>;

  deleteUser(id: string): Promise<boolean>;
}
