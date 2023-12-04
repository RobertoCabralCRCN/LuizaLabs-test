import {
  Column,
  PrimaryColumn,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { User } from "../../user/entities/User";
import { OrdersItems } from "./Orders-Items";

@Entity("orders")
class Order {
  @PrimaryColumn()
  order_id: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: number;

  @Column()
  date: Date;

  @OneToMany(() => OrdersItems, (orderItem) => orderItem.order, {eager: true})
  order_items: OrdersItems[];
}

export { Order };
