import { PrimaryGeneratedColumn } from "typeorm";

export class Entity {
  @PrimaryGeneratedColumn()
  id!: number;
}
