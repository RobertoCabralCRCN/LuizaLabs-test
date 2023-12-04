import "reflect-metadata";
import { FakeOrderRepository } from "../../repositories/fakes/FakeOrderRepository";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { FakeUserRepository } from "../../../user/repositories/fakes/FakeUserRepository";
import { AppError } from "../../../../errors/AppError";

let fakeOrderRepository: FakeOrderRepository;
let fakeUserRepository: FakeUserRepository;
let createOrderUseCase: CreateOrderUseCase;

const createNew = {
  order_id: 1,
  user_id: 1,
  date: new Date(),
};

describe("Create User", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    fakeUserRepository = new FakeUserRepository();
    createOrderUseCase = new CreateOrderUseCase(fakeOrderRepository, fakeUserRepository);

    jest.resetModules();
  });

  it("Should be able to create a user", async () => {
    await fakeUserRepository.create({
      user_id: 1,
      name: "John Dalton"
    })
    await expect(createOrderUseCase.execute(createNew)).resolves.not.toThrow();
  });

  it("Should be not able to create a order", async () => {
    await expect(
      createOrderUseCase.execute(createNew)
    ).rejects.toBeInstanceOf(AppError);
  });
  
});
