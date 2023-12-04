import { Order } from "../../entities/Order";
import {
  ICreateOrderDTO,
  IOrderRepository,
} from "../interfaces/OrdersRepository.interface";

class FakeOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  async create(data: ICreateOrderDTO): Promise<Order> {
    const order = new Order();
    order.order_items = []

    order.user = {
      user_id: data.user_id,
      name: 'teste',
      created_at: new Date(),
      updated_at: new Date()
    }

    order.order_items.push({
      product_id: 1,
      qty: 1,
      sub_total: 1,
      price: 1,
      order_item_id: 1,
      order_id: data.order_id,
      order: null,
      product: null      
    })

    Object.assign(order, {
      order_id: data.order_id,
      user_id: data.user_id,
      date: data.date
    });

    this.orders.push(order);

    return Promise.resolve(order);
  }

  findById(order_id: number): Promise<Order> {
    const foundOrder = this.orders.find((item) => item.order_id === order_id);

    return Promise.resolve(foundOrder);
  }

  findByUser(user_id: number): Promise<Order[]> {
    return Promise.resolve(
      this.orders.filter((item) => item.user_id === user_id)
    );
  }

  createBulk(data: ICreateOrderDTO[]): Promise<void> {
    return Promise.resolve()
  }
  
  findAll(skip: number, limit: number): Promise<Order[]> {
    return Promise.resolve(this.orders)
    
  }

}
export { FakeOrderRepository };
