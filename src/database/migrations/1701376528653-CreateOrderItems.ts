import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderItems1701376528653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders_items",
        columns: [
          {
            name: "order_item_id",
            type: "serial",
            isPrimary: true,
            generationStrategy: "identity",

          },
          {
            name: "order_id",
            type: "integer",
          },
          {
            name: "product_id",
            type: "integer",
          },
          {
            name: "qty",
            type: "integer",
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "sub_total",
            type: "numeric",
          },
        ],
        foreignKeys: [
          {
            name: "FKOrder",
            referencedTableName: "orders",
            referencedColumnNames: ["order_id"],
            columnNames: ["order_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKProduct",
            referencedTableName: "products",
            referencedColumnNames: ["product_id"],
            columnNames: ["product_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders_items");
  }
}
