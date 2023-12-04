import { FakeProductRepository } from "../../repositories/fakes/FakeProductRepository";
import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

let fakeProductRepository: FakeProductRepository;
let getAllProductsUseCase: GetAllProductsUseCase;

describe("List Products", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    getAllProductsUseCase = new GetAllProductsUseCase(fakeProductRepository);

    jest.resetModules();
  });

  it("Should be able to list a products", async () => {
    await expect(getAllProductsUseCase.execute()).resolves.not.toThrow();
  });
});
