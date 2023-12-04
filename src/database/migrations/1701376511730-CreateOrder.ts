import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrder1701376511730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "order_id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "integer",
          },
          {
            name: "date",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKOrderUser",
            referencedTableName: "users",
            referencedColumnNames: ["user_id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
