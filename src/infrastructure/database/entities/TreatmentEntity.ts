import { Entity as TypeOrmEntity, Column, OneToMany } from "typeorm";
import { AuditedEntity } from "./AuditedEntity";
import { TreatmentRecordEntity } from "./TreatmentRecordEntity";

@TypeOrmEntity("treatment")
export class TreatmentEntity extends AuditedEntity {
  @Column()
  name!: string;

  @OneToMany(() => TreatmentRecordEntity, (treatmentRecord) => treatmentRecord.treatment)
  treatmentRecords!: TreatmentRecordEntity[];
}
