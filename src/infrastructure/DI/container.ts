import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database/datasource";

container.registerInstance<DataSource>("DataSource", AppDataSource);
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

export { container };
