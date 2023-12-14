import { Food } from "../../models/food.model";

export interface FoodDao {
  createFood(id: string, roomId: string, food: Food): Promise<Food>;

  getFoods(): Promise<Food[]>;
  getFoodById(id: string): Promise<Food | undefined>;
  getFoodByRoomId(roomId: string): Promise<Food[] | undefined>;
  getFoodByUserId(userId: string): Promise<Food[] | undefined>;

  updateFood(id: string, food: Food): Promise<Food | undefined>;

  deleteFood(id: string): Promise<boolean>;
}
