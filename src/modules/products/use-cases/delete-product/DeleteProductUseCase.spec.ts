import "reflect-metadata";

import { AppError } from "../../../../errors/AppError";
import { FakeProductRepository } from "../../repositories/fakes/FakeProductRepository";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

let deleteProductUseCase: DeleteProductUseCase;

let fakeProductRepository: FakeProductRepository;

const product = {
  product_id: 1,
  name: "test",
  description: "test",
  value: 4,
  is_active: true,
};

describe("Update Product", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    deleteProductUseCase = new DeleteProductUseCase(fakeProductRepository);
    jest.resetModules();
  });

  it("Should be able to update a product", async () => {
    await fakeProductRepository.create(product);
    await expect(
      deleteProductUseCase.execute({
        ...product,

        is_active: false,
      })
    ).resolves.not.toThrow();
  });

  it("Should be not able to update a product", async () => {
    await fakeProductRepository.create(product);
    await expect(
      deleteProductUseCase.execute({
        ...product,

        product_id: 2,

        is_active: false,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
