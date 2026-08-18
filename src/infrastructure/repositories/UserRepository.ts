import { inject, injectable } from "tsyringe";
import { DataSource } from "typeorm";

import { UserModel } from "../../domain/models/UserModel";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserEntity } from "../database/entities/UserEntity";
import { UserMapper } from "../../application/mappers/UserMapper";
import { GenericRepository } from "./GenericRepository";

@injectable()
export class UserRepository extends GenericRepository<UserModel, UserEntity> implements IUserRepository {
  constructor(@inject("DataSource") dataSource: DataSource) {
    super(dataSource, UserEntity);
  }

  protected toDomain(entity: UserEntity): UserModel {
    return UserMapper.toDomain(entity);
  }

  protected toEntity(model: UserModel): UserEntity {
    return UserMapper.toEntity(model);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const entity = await this.repository.findOneBy({ email });
    return entity ? UserMapper.toDomain(entity) : null;
  }
}
