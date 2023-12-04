import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Product } from "../../products/entities/Product";
import { Order } from "./Order";

@Entity("orders_items")
class OrdersItems {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  order_id: number;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  product_id: number;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  sub_total: number;
}

export { OrdersItems };
