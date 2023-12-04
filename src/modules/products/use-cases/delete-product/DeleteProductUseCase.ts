import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IProductRepository } from "../../repositories/interfaces/ProductRepository.interface";
import { IDeleteProductRequestDTO } from "./dtos/DeleteProductRequest.dto";

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(input: IDeleteProductRequestDTO): Promise<void> {
    const products = await this.productRepository.findById(input.product_id);

    if (!products) {
      throw new AppError("Produto não encontrado", 404);
    }
    

    Object.assign(products, {
      is_active: false,
    });

    await this.productRepository.update(products)
  }
}

export { DeleteProductUseCase };
