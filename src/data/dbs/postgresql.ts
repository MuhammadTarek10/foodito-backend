import { User } from "../../models/user.model";
import { DataSource } from "../dao/datasource.dao";

export default class Postgresql implements DataSource {
  // * User
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
}
