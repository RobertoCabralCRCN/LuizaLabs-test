import "reflect-metadata";
import { FakeOrderItemRepository } from "../../repositories/fakes/FakeOrderItemRepository";
import { CreateOrderItemUseCase } from "./CreateItemUseCase";
import { FakeOrderRepository } from "../../repositories/fakes/FakeOrderRepository";
import { FakeProductRepository } from "../../../products/repositories/fakes/FakeProductRepository";
import { AppError } from "../../../../errors/AppError";

let fakeOrderItemRepository: FakeOrderItemRepository;
let fakeOrderRepository: FakeOrderRepository;
let fakeProductRepository: FakeProductRepository;
let createOrderItemUseCase: CreateOrderItemUseCase;

const createNew = {
  order_id: 1,
  product_id: 1,
  qty: 1,
  price: 1,
  sub_total: 1,
};

describe("Create Item", () => {
  beforeEach(() => {
    fakeOrderItemRepository = new FakeOrderItemRepository();
    fakeProductRepository = new FakeProductRepository();
    fakeOrderRepository = new FakeOrderRepository();
    createOrderItemUseCase = new CreateOrderItemUseCase(
      fakeOrderItemRepository,
      fakeProductRepository,
      fakeOrderRepository,
    );

    jest.resetModules();
  });

  it("Should be able to create a user", async () => {
    await fakeProductRepository.create({
      product_id: 1,
      name: 'test',
      description: 'test',
      value: 1,
      is_active: true
    })
    await fakeOrderRepository.create({
      order_id: 1,
      user_id: 1,
      date: new Date()
    })
    await expect(
      createOrderItemUseCase.execute(createNew)
    ).resolves.not.toThrow();
  });

  it("Should be not able to find a product", async () => {
    await expect(
      createOrderItemUseCase.execute(createNew)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not able to find a order", async () => {
    await fakeProductRepository.create({
      product_id: 1,
      name: 'test',
      description: 'test',
      value: 1,
      is_active: true
    })
    await expect(
      createOrderItemUseCase.execute(createNew)
    ).rejects.toBeInstanceOf(AppError);
  });
});
