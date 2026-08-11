import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AuditedEntity } from "./AuditedEntity";
import { PatientEntity } from "./PatientEntity";
import { TreatmentEntity } from "./TreatmentEntity";
import { TreatmentChargeEntity } from "./TreatmentChargeEntity";

@TypeOrmEntity("treatment_record")
export class TreatmentRecordEntity extends AuditedEntity {
  @Column({ type: "int" })
  patientId!: number;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: "patientId" })
  patient!: PatientEntity;

  @Column({ type: "int" })
  treatmentId!: number;

  @ManyToOne(() => TreatmentEntity)
  @JoinColumn({ name: "treatmentId" })
  treatment!: TreatmentEntity;

  @Column({ type: "date" })
  startDate!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount!: number;

  @OneToMany(() => TreatmentChargeEntity, (treatmentCharge) => treatmentCharge.treatmentRecord)
  treatmentCharges!: TreatmentChargeEntity[];
}
