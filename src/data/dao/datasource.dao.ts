import { UserDao } from "./user.dao";

export interface DataSource extends UserDao {}

export let db: DataSource;

export function initDataSource(dataSource: DataSource) {
  db = dataSource;
}
