import { instanceToInstance } from 'class-transformer';

import { Order } from '../../../entities/Order';
import { IGetByUserOrderResponseDTO } from '../dtos/GetByUserOrderResponse.dto';

class OrderByUserMap {
  static toDTO(orders: Order[]): IGetByUserOrderResponseDTO {
    const retOrder = instanceToInstance({
      user_id: orders[0].user.user_id,
      name: orders[0].user.name,
      orders: orders.map(order => ({
        order_id: order.order_id,
        total: order.order_items.reduce((sum:number, item) => sum + Number(item.sub_total), 0),
        date: order.date.toISOString().split('T')[0],
        products: order.order_items.map(item => ({
          product_id: item.product_id,
          value: Number(item.sub_total),
        })),
      })),
    });
    return retOrder;
  }
}

export { OrderByUserMap };
