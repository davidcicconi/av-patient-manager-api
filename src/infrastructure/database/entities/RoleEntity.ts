import { Entity as TypeOrmEntity, Column, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { UserEntity } from "./UserEntity";

@TypeOrmEntity("role")
export class RoleEntity extends Entity {
  @Column()
  name!: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users!: UserEntity[];
}
