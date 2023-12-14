import { Food } from "../../models/food.model";
import { Order } from "../../models/order.model";
import { Room } from "../../models/room.model";
import { User } from "../../models/user.model";
import { DataSource } from "../dao/datasource.dao";

export default class Postgresql implements DataSource {
  async createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async getUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async getUserById(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async updateUser(id: string, user: User): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async deleteUser(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async createRoom(room: Room): Promise<Room> {
    throw new Error("Method not implemented.");
  }
  async getRooms(): Promise<Room[]> {
    throw new Error("Method not implemented.");
  }
  async getRoomById(id: string): Promise<Room | undefined> {
    throw new Error("Method not implemented.");
  }
  async updateRoom(id: string, room: Room): Promise<Room | undefined> {
    throw new Error("Method not implemented.");
  }
  async deleteRoom(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async createFood(id: string, roomId: string, food: Food): Promise<Food> {
    throw new Error("Method not implemented.");
  }
  async getFoods(): Promise<Food[]> {
    throw new Error("Method not implemented.");
  }
  async getFoodById(id: string): Promise<Food | undefined> {
    throw new Error("Method not implemented.");
  }
  async getFoodByRoomId(roomId: string): Promise<Food[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async getFoodByUserId(userId: string): Promise<Food[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async updateFood(id: string, food: Food): Promise<Food | undefined> {
    throw new Error("Method not implemented.");
  }
  async deleteFood(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async createOrder(
    id: string,
    userId: string,
    roomId: string,
    foodId: string
  ): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async getOrders(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  async getOrderById(id: string): Promise<Order | undefined> {
    throw new Error("Method not implemented.");
  }
  async getOrderByUserId(userId: string): Promise<Order[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async getOrderByRoomId(roomId: string): Promise<Order[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async getOrderByFoodId(foodId: string): Promise<Order[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async updateOrder(id: string, order: Order): Promise<Order | undefined> {
    throw new Error("Method not implemented.");
  }
  async deleteOrder(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
