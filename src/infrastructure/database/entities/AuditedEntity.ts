import { Entity } from "./Entity";
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class AuditedEntity extends Entity {
    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn({ type: "datetime", nullable: true })
    updatedAt!: Date;
    
    @Column({ type: "int", nullable: true })
    createdBy!: number | null;
    
    @Column({ type: "int", nullable: true })
    updatedBy!: number | null;

    @Column({ type: "datetime", nullable: true })
    deletedAt!: Date | null;

    @Column({ type: "boolean", default: false })
    isDeleted: boolean = false;
}
