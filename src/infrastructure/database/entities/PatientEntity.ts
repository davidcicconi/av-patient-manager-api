import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { ClientEntity } from "./ClientEntity";
import { MedicalEntityEntity } from "./MedicalEntityEntity";
import { TreatmentRecordEntity } from "./TreatmentRecordEntity";
import { PatientMedicalReportEntity } from "./PatientMedicalReportEntity";

@TypeOrmEntity("patient")
export class PatientEntity extends Entity {
  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "int" })
  clientId!: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: "clientId" })
  client!: ClientEntity;

  @Column({ type: "varchar", length: 20, nullable: true })
  dni!: string | null;

  @Column({ type: "varchar", nullable: true })
  province!: string | null;

  @Column({ type: "varchar", nullable: true })
  city!: string | null;

  @Column({ type: "varchar", nullable: true })
  streetAddress!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber!: string | null;

  @Column({ type: "int" })
  medicalEntityId!: number;

  @ManyToOne(() => MedicalEntityEntity)
  @JoinColumn({ name: "medicalEntityId" })
  medicalEntity!: MedicalEntityEntity;

  @Column({ type: "varchar", length: 50, nullable: true })
  treatingMedicalName!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  treatingMedicalLastName!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  treatmentCompanyAwarded!: string | null;

  @OneToMany(() => TreatmentRecordEntity, (treatmentRecord) => treatmentRecord.patient)
  treatmentRecords!: TreatmentRecordEntity[];

  @OneToMany(() => PatientMedicalReportEntity, (report) => report.patient)
  medicalReports!: PatientMedicalReportEntity[];
}
