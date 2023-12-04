import { inject, injectable } from "tsyringe";

import { IOrderRepository } from "../../repositories/interfaces/OrdersRepository.interface";
import { IGetByUserOrderRequestDTO } from "./dtos/GetByUserOrderRequest.dto";
import { IGetByUserOrderResponseDTO } from "./dtos/GetByUserOrderResponse.dto";
import { OrderByUserMap } from "./mapper/mapper";

@injectable()
class GetByUserOrderUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(
    input: IGetByUserOrderRequestDTO
  ): Promise<IGetByUserOrderResponseDTO> {
    const ordersFinded = await this.orderRepository.findByUser(
      input.user_id
    );

    return OrderByUserMap.toDTO(ordersFinded)
    
  }
}

export { GetByUserOrderUseCase };
