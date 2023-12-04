import { inject, injectable } from "tsyringe";

import { IProductRepository } from "../../repositories/interfaces/ProductRepository.interface";
import { IGetAllProductResponseDTO } from "./dtos/GetAllProductsResponse.dto";

@injectable()
class GetAllProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(): Promise<IGetAllProductResponseDTO[]> {
    const products = await this.productRepository.findAll();

    return products;
  }
}

export { GetAllProductsUseCase };
