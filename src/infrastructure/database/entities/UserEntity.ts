import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RoleEntity } from "./RoleEntity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  hashPassword!: string;

  @Column({ type: "int", nullable: true })
  roleId!: number | null;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: "roleId" })
  role!: RoleEntity | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
