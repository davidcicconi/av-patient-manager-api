import { IocContainer } from "@tsoa/runtime";
import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { ITokenService } from "../../application/services/interfaces/ITokenService";
import { UserRepository } from "../repositories/UserRepository";
import { BcryptPasswordHasher } from "../auth/BcryptPasswordHasher";
import { JwtTokenService } from "../auth/JwtTokenService";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { AppDataSource } from "../database/datasource";

container.registerInstance<DataSource>("DataSource", AppDataSource);

container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
container.registerSingleton<IPasswordHasher>("IPasswordHasher", BcryptPasswordHasher);
container.registerSingleton<ITokenService>("ITokenService", JwtTokenService);

container.registerSingleton(LoginUseCase, LoginUseCase);

export const iocContainer: IocContainer = {
  get: <T>(controller: unknown): T => container.resolve<T>(controller as never),
};

export { container };
