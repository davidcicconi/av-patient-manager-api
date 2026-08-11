import { inject, injectable } from "tsyringe";
import { DataSource } from "typeorm";

import { UserModel } from "../../domain/models/UserModel";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserEntity } from "../database/entities/UserEntity";
import { GenericRepository } from "./GenericRepository";

@injectable()
export class UserRepository extends GenericRepository<UserModel, UserEntity> implements IUserRepository {
  constructor(@inject("DataSource") dataSource: DataSource) {
    super(dataSource, UserEntity);
  }

  protected toDomain(entity: UserEntity): UserModel {
    return new UserModel(
      entity.id,
      entity.name,
      entity.lastName,
      entity.email,
      entity.hashPassword,
      entity.createdAt,
      entity.updatedAt,
      entity.roleId ?? undefined,
    );
  }

  protected toEntity(model: UserModel): UserEntity {
    const entity = new UserEntity();
    if (model.id !== null) {
      entity.id = model.id;
    }
    entity.name = model.name;
    entity.lastName = model.lastName;
    entity.email = model.email;
    entity.hashPassword = model.hashPassword;
    entity.roleId = model.roleId ?? null;
    return entity;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const entity = await this.repository.findOneBy({ email });
    return entity ? this.toDomain(entity) : null;
  }
}
