import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOrderItemUseCase } from "./CreateItemUseCase";

class CreateOrderItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order_id, product_id, qty, price, sub_total } = request.body;

    const createOrderItemUseCase = container.resolve(CreateOrderItemUseCase);

    const orderItemCreated = await createOrderItemUseCase.execute({
      order_id: Number(order_id),
      product_id: Number(product_id),
      qty: Number(qty),
      price: Number(price),
    });

    return response.status(201).send(orderItemCreated);
  }
}

export { CreateOrderItemController };
