import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Entity } from "./Entity";
import { PatientMedicalReportEntity } from "./PatientMedicalReportEntity";

@TypeOrmEntity("patient_treatment_image")
export class PatientTreatmentImageEntity extends Entity {
  @Column({ type: "int" })
  patientMedicalReportId!: number;

  @ManyToOne(() => PatientMedicalReportEntity)
  @JoinColumn({ name: "patientMedicalReportId" })
  patientMedicalReport!: PatientMedicalReportEntity;

  @Column({ type: "datetime", nullable: true })
  date!: Date | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  observation!: string | null;

  @Column({ type: "varchar", length: 500 })
  fileUrl!: string;

  @Column({ type: "varchar", length: 255 })
  fileName!: string;
}
