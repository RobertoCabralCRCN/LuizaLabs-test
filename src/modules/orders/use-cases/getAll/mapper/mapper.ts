
import { Order } from '../../../entities/Order';
import { IGetAllOrdersResponseDTO } from '../dtos/GetAllOrdersResponse.dto';

class OrderGroupByUserMap {
  static toDTO(orders: Order[]): IGetAllOrdersResponseDTO[] {
    const userOrdersMap = new Map<string, IGetAllOrdersResponseDTO>();

    orders.forEach(order => {
      const userId = order.user.user_id.toString();

      if (!userOrdersMap.has(userId)) {
        userOrdersMap.set(userId, {
          user_id: Number(userId),
          name: order.user.name,
          orders: [],
        });
      }

      const userOrder = userOrdersMap.get(userId)!;
      userOrder.orders.push({
        order_id: order.order_id,
        total: order.order_items.reduce((sum, item) => sum + item.sub_total, 0),
        date: order.date.toISOString().split('T')[0],
        products: order.order_items.map(item => ({
          product_id: item.product_id,
          value: item.sub_total,
        })),
      });
    });

    const retOrders = Array.from(userOrdersMap.values());

    return retOrders;
  }
}

export { OrderGroupByUserMap };
