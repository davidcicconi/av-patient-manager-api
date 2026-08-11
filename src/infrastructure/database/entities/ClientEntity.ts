import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { ClientTypeEntity } from "./ClientTypeEntity";
import { PatientEntity } from "./PatientEntity";
import { TreatmentChargeEntity } from "./TreatmentChargeEntity";

@TypeOrmEntity("client")
export class ClientEntity extends Entity {
  @Column()
  name!: string;

  @Column({ type: "int" })
  clientTypeId!: number;

  @ManyToOne(() => ClientTypeEntity)
  @JoinColumn({ name: "clientTypeId" })
  clientType!: ClientTypeEntity;

  @Column({ type: "varchar", nullable: true })
  city!: string | null;

  @Column({ type: "varchar", nullable: true })
  cuit!: string | null;

  @OneToMany(() => PatientEntity, (patient) => patient.client)
  patients!: PatientEntity[];

  @OneToMany(() => TreatmentChargeEntity, (treatmentCharge) => treatmentCharge.client)
  treatmentCharges!: TreatmentChargeEntity[];
}
