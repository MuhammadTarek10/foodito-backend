import Postgresql from "../dbs/postgresql";
import { FoodDao } from "./food.dao";
import { OrderDao } from "./order.dao";
import { RoomDao } from "./room.dao";
import { UserDao } from "./user.dao";

export interface DataSource extends UserDao, RoomDao, FoodDao, OrderDao {}

export let db: DataSource;

export function initDataSource() {
  db = new Postgresql();
}
