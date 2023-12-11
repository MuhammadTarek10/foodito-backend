import { User } from "../../models/user.model";

export interface UserDao {
  createUser(user: User): Promise<User>;

  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | undefined>;

  updateUser(id: string, user: User): Promise<User | undefined>;

  deleteUser(id: string): Promise<boolean>;
}
