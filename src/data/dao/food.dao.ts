import { Food } from "../../models/food.model";

export interface FoodDao {
  createFood(id: string, roomId: string, food: Food): Promise<Food>;

  getFoodByRoomId(roomId: string): Promise<Food[] | undefined>;
  getFoodById(id: string): Promise<Food | undefined>;
  getFoodByUserId(userId: string): Promise<Food[] | undefined>;

  updateFood(id: string, food: Food): Promise<Food | undefined>;

  deleteFood(id: string): Promise<boolean>;
}
