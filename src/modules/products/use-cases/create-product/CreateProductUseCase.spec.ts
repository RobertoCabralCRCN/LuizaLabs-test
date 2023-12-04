import "reflect-metadata";

import { FakeProductRepository } from "../../repositories/fakes/FakeProductRepository";
import { CreateProductUseCase } from "./CreateProductUseCase";

let fakeProductRepository: FakeProductRepository;

let createProductUseCase: CreateProductUseCase;

const createNew = {
  product_id: 1,
  name: "John Dalton",
  description: "test",
  value: 1,
  is_active: true,
  created_at: new Date(),
};

describe("Create Product", () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductUseCase = new CreateProductUseCase(fakeProductRepository);
    jest.resetModules();
  });

  it("Should be able to create a product", async () => {
    await expect(
      createProductUseCase.execute(createNew)
    ).resolves.not.toThrow();
  });
});
