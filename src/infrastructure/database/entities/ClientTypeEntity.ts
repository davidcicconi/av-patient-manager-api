import { Entity as TypeOrmEntity, Column, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { ClientEntity } from "./ClientEntity";

@TypeOrmEntity("client_type")
export class ClientTypeEntity extends Entity {
  @Column({ type: "varchar", nullable: true })
  name!: string | null;

  @OneToMany(() => ClientEntity, (client) => client.clientType)
  clients!: ClientEntity[];
}
