import { Entity as TypeOrmEntity, Column, OneToMany } from "typeorm";
import { Entity } from "./Entity";
import { PaymentEntity } from "./PaymentEntity";

@TypeOrmEntity("payment_method")
export class PaymentMethodEntity extends Entity {
  @Column({ type: "varchar", nullable: true })
  name!: string | null;

  @OneToMany(() => PaymentEntity, (payment) => payment.paymentMethod)
  payments!: PaymentEntity[];
}
