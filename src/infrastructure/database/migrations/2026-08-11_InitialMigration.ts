import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialMigration1723366800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Role
    await queryRunner.createTable(
      new Table({
        name: "role",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: false },
        ],
      }),
      true,
    );

    // User
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "roleId", type: "int", isNullable: false },
          { name: "name", type: "varchar", isNullable: false },
          { name: "lastName", type: "varchar", isNullable: false },
          { name: "email", type: "varchar", isNullable: false, isUnique: true },
          { name: "hashPassword", type: "varchar", isNullable: false },
          { name: "createdAt", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "updatedAt", type: "datetime", isNullable: true },
          { name: "createdBy", type: "int", isNullable: true },
          { name: "updatedBy", type: "int", isNullable: true },
          { name: "deletedAt", type: "datetime", isNullable: true },
          { name: "isDeleted", type: "boolean", default: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedTableName: "role",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    );

    // ClientType
    await queryRunner.createTable(
      new Table({
        name: "client_type",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: true },
        ],
      }),
      true,
    );

    // Client
    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: false },
          { name: "clientTypeId", type: "int", isNullable: false },
          { name: "city", type: "varchar", isNullable: true },
          { name: "cuit", type: "varchar", isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "client",
      new TableForeignKey({
        columnNames: ["clientTypeId"],
        referencedTableName: "client_type",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    );

    // MedicalEntity
    await queryRunner.createTable(
      new Table({
        name: "medical_entity",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", length: "100", isNullable: true },
          { name: "address", type: "varchar", length: "100", isNullable: true },
          { name: "city", type: "varchar", length: "100", isNullable: true },
          { name: "phoneNumber", type: "varchar", length: "20", isNullable: true },
        ],
      }),
      true,
    );

    // Patient
    await queryRunner.createTable(
      new Table({
        name: "patient",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: false },
          { name: "lastName", type: "varchar", isNullable: false },
          { name: "email", type: "varchar", isNullable: false, isUnique: true },
          { name: "clientId", type: "int", isNullable: false },
          { name: "dni", type: "varchar", length: "20", isNullable: true },
          { name: "province", type: "varchar", isNullable: true },
          { name: "city", type: "varchar", isNullable: true },
          { name: "streetAddress", type: "varchar", isNullable: true },
          { name: "phoneNumber", type: "varchar", length: "20", isNullable: true },
          { name: "medicalEntityId", type: "int", isNullable: false },
          { name: "treatingMedicalName", type: "varchar", length: "50", isNullable: true },
          { name: "treatingMedicalLastName", type: "varchar", length: "50", isNullable: true },
          { name: "treatmentCompanyAwarded", type: "varchar", length: "50", isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys("patient", [
      new TableForeignKey({
        columnNames: ["clientId"],
        referencedTableName: "client",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
      new TableForeignKey({
        columnNames: ["medicalEntityId"],
        referencedTableName: "medical_entity",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    ]);

    // Treatment
    await queryRunner.createTable(
      new Table({
        name: "treatment",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: false },
          { name: "createdAt", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "updatedAt", type: "datetime", isNullable: true },
          { name: "createdBy", type: "int", isNullable: true },
          { name: "updatedBy", type: "int", isNullable: true },
          { name: "deletedAt", type: "datetime", isNullable: true },
          { name: "isDeleted", type: "boolean", default: false },
        ],
      }),
      true,
    );

    // TreatmentRecord
    await queryRunner.createTable(
      new Table({
        name: "treatment_record",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "patientId", type: "int", isNullable: false },
          { name: "treatmentId", type: "int", isNullable: false },
          { name: "startDate", type: "date", isNullable: false },
          { name: "totalAmount", type: "decimal", precision: 10, scale: 2, isNullable: false },
          { name: "createdAt", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "updatedAt", type: "datetime", isNullable: true },
          { name: "createdBy", type: "int", isNullable: true },
          { name: "updatedBy", type: "int", isNullable: true },
          { name: "deletedAt", type: "datetime", isNullable: true },
          { name: "isDeleted", type: "boolean", default: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys("treatment_record", [
      new TableForeignKey({
        columnNames: ["patientId"],
        referencedTableName: "patient",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
      new TableForeignKey({
        columnNames: ["treatmentId"],
        referencedTableName: "treatment",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    ]);

    // TreatmentCharge
    await queryRunner.createTable(
      new Table({
        name: "treatment_charge",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "treatmentRecordId", type: "int", isNullable: false },
          { name: "clientId", type: "int", isNullable: false },
          { name: "amount", type: "decimal", precision: 10, scale: 2, isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys("treatment_charge", [
      new TableForeignKey({
        columnNames: ["treatmentRecordId"],
        referencedTableName: "treatment_record",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
      new TableForeignKey({
        columnNames: ["clientId"],
        referencedTableName: "client",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    ]);

    // PaymentMethod
    await queryRunner.createTable(
      new Table({
        name: "payment_method",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: true },
        ],
      }),
      true,
    );

    // Payment
    await queryRunner.createTable(
      new Table({
        name: "payment",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "treatmentChargeId", type: "int", isNullable: false },
          { name: "paymentDate", type: "date", isNullable: true },
          { name: "amount", type: "decimal", precision: 10, scale: 2, isNullable: false },
          { name: "net", type: "decimal", precision: 10, scale: 2, isNullable: false },
          { name: "paymentMethodId", type: "int", isNullable: false },
          { name: "invoiceNumber", type: "varchar", isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys("payment", [
      new TableForeignKey({
        columnNames: ["treatmentChargeId"],
        referencedTableName: "treatment_charge",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
      new TableForeignKey({
        columnNames: ["paymentMethodId"],
        referencedTableName: "payment_method",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    ]);

    // PatientMedicalReport
    await queryRunner.createTable(
      new Table({
        name: "patient_medical_report",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "code", type: "varchar", length: "50", isNullable: true },
          { name: "patientId", type: "int", isNullable: false },
          { name: "presentation", type: "varchar", length: "500", isNullable: true },
          { name: "finalDescription", type: "varchar", length: "500", isNullable: true },
          { name: "dateFrom", type: "datetime", isNullable: true },
          { name: "dateTo", type: "datetime", isNullable: true },
          { name: "createdAt", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "updatedAt", type: "datetime", isNullable: true },
          { name: "createdBy", type: "int", isNullable: true },
          { name: "updatedBy", type: "int", isNullable: true },
          { name: "deletedAt", type: "datetime", isNullable: true },
          { name: "isDeleted", type: "boolean", default: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "patient_medical_report",
      new TableForeignKey({
        columnNames: ["patientId"],
        referencedTableName: "patient",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    );

    // PatientTreatmentImage
    await queryRunner.createTable(
      new Table({
        name: "patient_treatment_image",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "patientMedicalReportId", type: "int", isNullable: false },
          { name: "date", type: "datetime", isNullable: true },
          { name: "observation", type: "varchar", length: "500", isNullable: true },
          { name: "fileUrl", type: "varchar", length: "500", isNullable: false },
          { name: "fileName", type: "varchar", length: "255", isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "patient_treatment_image",
      new TableForeignKey({
        columnNames: ["patientMedicalReportId"],
        referencedTableName: "patient_medical_report",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("patient_treatment_image", true, true);
    await queryRunner.dropTable("patient_medical_report", true, true);
    await queryRunner.dropTable("payment", true, true);
    await queryRunner.dropTable("payment_method", true, true);
    await queryRunner.dropTable("treatment_charge", true, true);
    await queryRunner.dropTable("treatment_record", true, true);
    await queryRunner.dropTable("treatment", true, true);
    await queryRunner.dropTable("patient", true, true);
    await queryRunner.dropTable("medical_entity", true, true);
    await queryRunner.dropTable("client", true, true);
    await queryRunner.dropTable("client_type", true, true);
    await queryRunner.dropTable("user", true, true);
    await queryRunner.dropTable("role", true, true);
  }
}
