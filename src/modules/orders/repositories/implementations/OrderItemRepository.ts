import { getRepository, Repository } from "typeorm";

import { OrdersItems } from "../../entities/Orders-Items";
import {
  ICreateItemDTO,
  IOrderItemRepository,
} from "../interfaces/OrderItemRepository.interface";

export class OrderItemRepository implements IOrderItemRepository {
  private repository: Repository<OrdersItems>;

  constructor() {
    this.repository = getRepository(OrdersItems);
  }

  async create(data: ICreateItemDTO): Promise<OrdersItems> {
    const item = this.repository.create({
      order_id: data.order_id,
      product_id: data.product_id,
      qty: data.qty,
      price: data.price,
      sub_total: data.sub_total,
    });

    const itemSaved = await this.repository.save(item)

    return itemSaved;
  }

  async createBulk(data: ICreateItemDTO[]): Promise<void> {
    const item = this.repository.create(data);

    await this.repository.save(item)

    return;
  }
}
