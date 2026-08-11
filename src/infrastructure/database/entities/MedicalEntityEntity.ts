import { Entity as TypeOrmEntity, Column, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { PatientEntity } from "./PatientEntity";

@TypeOrmEntity("medical_entity")
export class MedicalEntityEntity extends Entity {
  @Column({ type: "varchar", length: 100, nullable: true })
  name!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  address!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  city!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber!: string | null;

  @OneToMany(() => PatientEntity, (patient) => patient.medicalEntity)
  patients!: PatientEntity[];
}
