import { inject, injectable } from "tsyringe";

import { IOrderItemRepository } from "../../repositories/interfaces/OrderItemRepository.interface";
import { ICreateItemRequestDTO } from "./dtos/CreateItemRequest.dto";
import { ICreateItemResponseDTO } from "./dtos/CreateItemResponse.dto";
import { IProductRepository } from "../../../products/repositories/interfaces/ProductRepository.interface";
import { AppError } from "../../../../errors/AppError";
import { IOrderRepository } from "../../repositories/interfaces/OrdersRepository.interface";

@injectable()
class CreateOrderItemUseCase {
  constructor(
    @inject("OrderItemRepository")
    private orderItemRepository: IOrderItemRepository,

    @inject("ProductRepository")
    private productRepository: IProductRepository,

    @inject("OrderRepository")
    private orderRepository: IOrderRepository,

  ) {}

  async execute(input: ICreateItemRequestDTO): Promise<ICreateItemResponseDTO> {
    const product = await this.productRepository.findById(input.product_id)

    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    const order = await this.orderRepository.findById(input.order_id)

    if (!order) {
      throw new AppError('Pedido não encontrado', 404)
    }

    const created = await this.orderItemRepository.create({
      ...input, 
      sub_total: (Number(input.qty) * Number(input.price))
    });

    return created;
  }
}

export { CreateOrderItemUseCase };
