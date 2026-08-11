import { UserEntity } from "./UserEntity";
import { RoleEntity } from "./RoleEntity";
import { ClientTypeEntity } from "./ClientTypeEntity";
import { ClientEntity } from "./ClientEntity";
import { MedicalEntityEntity } from "./MedicalEntityEntity";
import { PatientEntity } from "./PatientEntity";
import { TreatmentEntity } from "./TreatmentEntity";
import { TreatmentRecordEntity } from "./TreatmentRecordEntity";
import { TreatmentChargeEntity } from "./TreatmentChargeEntity";
import { PaymentMethodEntity } from "./PaymentMethodEntity";
import { PaymentEntity } from "./PaymentEntity";
import { PatientMedicalReportEntity } from "./PatientMedicalReportEntity";
import { PatientTreatmentImageEntity } from "./PatientTreatmentImageEntity";

export * from "./UserEntity";
export * from "./RoleEntity";
export * from "./ClientTypeEntity";
export * from "./ClientEntity";
export * from "./MedicalEntityEntity";
export * from "./PatientEntity";
export * from "./TreatmentEntity";
export * from "./TreatmentRecordEntity";
export * from "./TreatmentChargeEntity";
export * from "./PaymentMethodEntity";
export * from "./PaymentEntity";
export * from "./PatientMedicalReportEntity";
export * from "./PatientTreatmentImageEntity";

// Agregar acá cada nueva entidad para que quede registrada en el DataSource.
export const entities = [
  UserEntity,
  RoleEntity,
  ClientTypeEntity,
  ClientEntity,
  MedicalEntityEntity,
  PatientEntity,
  TreatmentEntity,
  TreatmentRecordEntity,
  TreatmentChargeEntity,
  PaymentMethodEntity,
  PaymentEntity,
  PatientMedicalReportEntity,
  PatientTreatmentImageEntity,
];
