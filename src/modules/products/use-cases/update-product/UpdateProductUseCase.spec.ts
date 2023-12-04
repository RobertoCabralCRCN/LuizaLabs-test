import { AppError } from "../../../../errors/AppError";
import { FakeProductRepository } from "../../repositories/fakes/FakeProductRepository";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

let updateProductUseCase: UpdateProductUseCase;
let fakeProductRepository: FakeProductRepository;

const product = {
  product_id: 1,
  name: "test",
  description: "test",
  value: 4,
  is_active: null,
};

describe("Update Product", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    updateProductUseCase = new UpdateProductUseCase(fakeProductRepository);
    jest.resetModules();
  });

  it("Should be able to update a product", async () => {
    await fakeProductRepository.create(product);
    await expect(
      updateProductUseCase.execute({
        ...product,
        name: "teste 2",
        description: "aaaaa",
      })
    ).resolves.not.toThrow();
  });

  it("Should be not able to update a product", async () => {
    await fakeProductRepository.create(product);
    await expect(
      updateProductUseCase.execute({
        ...product,
        product_id: 2,
        name: "teste 2",
        description: "aaaaa",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
