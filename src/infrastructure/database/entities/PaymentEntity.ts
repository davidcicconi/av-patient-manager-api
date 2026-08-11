import { Entity as TypeOrmEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Entity } from "./Entity";
import { TreatmentChargeEntity } from "./TreatmentChargeEntity";
import { PaymentMethodEntity } from "./PaymentMethodEntity";

@TypeOrmEntity("payment")
export class PaymentEntity extends Entity {
  @Column({ type: "int" })
  treatmentChargeId!: number;

  @ManyToOne(() => TreatmentChargeEntity)
  @JoinColumn({ name: "treatmentChargeId" })
  treatmentCharge!: TreatmentChargeEntity;

  @Column({ type: "date", nullable: true })
  paymentDate!: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  net!: number;

  @Column({ type: "int" })
  paymentMethodId!: number;

  @ManyToOne(() => PaymentMethodEntity)
  @JoinColumn({ name: "paymentMethodId" })
  paymentMethod!: PaymentMethodEntity;

  @Column({ type: "varchar", nullable: true })
  invoiceNumber!: string | null;
}
