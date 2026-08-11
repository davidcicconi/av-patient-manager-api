import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AuditedEntity } from "./AuditedEntity";
import { PatientEntity } from "./PatientEntity";
import { PatientTreatmentImageEntity } from "./PatientTreatmentImageEntity";

@TypeOrmEntity("patient_medical_report")
export class PatientMedicalReportEntity extends AuditedEntity {
  @Column({ type: "varchar", length: 50, nullable: true })
  code!: string | null;

  @Column({ type: "int" })
  patientId!: number;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: "patientId" })
  patient!: PatientEntity;

  @Column({ type: "varchar", length: 500, nullable: true })
  presentation!: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  finalDescription!: string | null;

  @Column({ type: "datetime", nullable: true })
  dateFrom!: Date | null;

  @Column({ type: "datetime", nullable: true })
  dateTo!: Date | null;

  @OneToMany(() => PatientTreatmentImageEntity, (image) => image.patientMedicalReport)
  images!: PatientTreatmentImageEntity[];
}
