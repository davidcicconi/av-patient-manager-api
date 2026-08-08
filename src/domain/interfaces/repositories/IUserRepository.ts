import { IGenericRepository } from "./IGenericRepository";
import { UserModel } from "../../models/UserModel";

export interface IUserRepository extends IGenericRepository<UserModel> {
  findByEmail(email: string): Promise<UserModel | null>;
}
