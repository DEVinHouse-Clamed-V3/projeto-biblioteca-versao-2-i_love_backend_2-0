import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TableReaders1738296277477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: "readers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "200",
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "20",
          },
          {
            name: "birthdate",
            type: "date",
          },
          {
            name: "address",
            type: "text",
          },
          {
            name: "active",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("readers");
  }
}
