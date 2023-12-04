import { inject, injectable } from "tsyringe";

import { IOrderRepository } from "../../repositories/interfaces/OrdersRepository.interface";
import { IGetByIdOrderRequestDTO } from "./dtos/GetByIdOrderRequest.dto";
import { IGetByIdOrderResponseDTO } from "./dtos/GetByIdOrderResponse.dto";

@injectable()
class GetByIdOrderUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(
    input: IGetByIdOrderRequestDTO
  ): Promise<IGetByIdOrderResponseDTO> {
    const orderFounded = await this.orderRepository.findById(input.order_id);

    return orderFounded;
  }
}

export { GetByIdOrderUseCase };
