import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IProductRepository } from "../../repositories/interfaces/ProductRepository.interface";
import { IUpdateProductRequestDTO } from "./dtos/UpdateProductRequest.dto";
import { IUpdateProductResponseDTO } from "./dtos/UpdateProductResponse.dto";

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(
    input: IUpdateProductRequestDTO
  ): Promise<IUpdateProductResponseDTO> {
    const products = await this.productRepository.findById(input.product_id);

    if (!products) {
      throw new AppError("Produto não encontrado", 404);
    }

    Object.assign(products, {
      name: input.name,
      description: input.description,
      value: input.value,
      is_active: input.is_active,
    });

    const newObj = await this.productRepository.update(products)
    return newObj;
  }
}

export { UpdateProductUseCase };
