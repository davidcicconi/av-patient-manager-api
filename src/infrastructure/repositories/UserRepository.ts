import { injectable } from "tsyringe";

import { User } from "../../domain/models/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    // TypeORM
    throw new Error("Not implemented.");
  }

  async findAll(): Promise<User[]> {
    throw new Error("Not implemented.");
  }

  async findById(id: number): Promise<User | null> {
    throw new Error("Not implemented.");
  }

  async update(user: User): Promise<User> {
    throw new Error("Not implemented.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Not implemented.");
  }
}
