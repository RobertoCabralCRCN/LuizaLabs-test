export interface IGetByIdOrderResponseDTO {
  order_id: number;
  user_id: number;
  date: Date;
  order_items: {
    order_item_id: number;
    order_id: number;
    product_id: number;
    qty: number;
    price: number;
    sub_total: number;
  }[];
}
