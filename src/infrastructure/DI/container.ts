import { container } from "tsyringe";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";

container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

export { container };
