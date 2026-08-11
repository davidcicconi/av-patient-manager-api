import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { TreatmentRecordEntity } from "./TreatmentRecordEntity";
import { ClientEntity } from "./ClientEntity";
import { PaymentEntity } from "./PaymentEntity";

@TypeOrmEntity("treatment_charge")
export class TreatmentChargeEntity extends Entity {
  @Column({ type: "int" })
  treatmentRecordId!: number;

  @ManyToOne(() => TreatmentRecordEntity)
  @JoinColumn({ name: "treatmentRecordId" })
  treatmentRecord!: TreatmentRecordEntity;

  @Column({ type: "int" })
  clientId!: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: "clientId" })
  client!: ClientEntity;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @OneToMany(() => PaymentEntity, (payment) => payment.treatmentCharge)
  payments!: PaymentEntity[];
}
