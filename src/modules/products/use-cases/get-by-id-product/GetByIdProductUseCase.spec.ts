import { FakeProductRepository } from "../../repositories/fakes/FakeProductRepository";
import { GetByIdProductUseCase } from "./GetByIdProductUseCase";

let getByIdProductUseCase: GetByIdProductUseCase;
let fakeProductRepository: FakeProductRepository;

const product = {
  product_id: 1,
  name: "test",
  description: "test",
  value: 4,
  is_active: null,
};

describe("Retrieve Product", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    getByIdProductUseCase = new GetByIdProductUseCase(fakeProductRepository);
    jest.resetModules();
  });

  it("Should be able retrieve a product", async () => {
    await fakeProductRepository.create(product);
    await expect(
      getByIdProductUseCase.execute({
        product_id: 1,
      })
    ).resolves.not.toThrow();
  });
});
