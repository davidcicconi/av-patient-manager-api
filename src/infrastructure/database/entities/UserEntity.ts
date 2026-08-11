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

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

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
