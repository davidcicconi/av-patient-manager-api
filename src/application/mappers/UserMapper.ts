import { UserModel } from "../../domain/models/UserModel";
import { UserEntity } from "../../infrastructure/database/entities/UserEntity";

export class UserMapper {
  static toDomain(entity: UserEntity): UserModel {
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

  static toEntity(model: UserModel): UserEntity {
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
}
