import { Food } from "../../models/food.model";

export interface FoodDao {
  createFood(id: string, roomId: string, food: Food): Promise<Food>;

  getFoodsByRoomId(roomId: string): Promise<Food[] | undefined>;
  getFoodById(id: string): Promise<Food | undefined>;
  getFoodsByUserId(userId: string): Promise<Food[] | undefined>;

  updateFood(food: Food): Promise<Food | undefined>;

  deleteFood(id: string): Promise<boolean>;
}
