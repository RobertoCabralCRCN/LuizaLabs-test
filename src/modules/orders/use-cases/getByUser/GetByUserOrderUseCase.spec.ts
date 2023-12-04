import { FakeOrderRepository } from "../../repositories/fakes/FakeOrderRepository";
import { GetByUserOrderUseCase } from "./GetByUserOrderUserCase";

let getByUserOrderUseCase: GetByUserOrderUseCase;
let fakeOrderRepository: FakeOrderRepository;

describe("Retrieve User Order", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    getByUserOrderUseCase = new GetByUserOrderUseCase(fakeOrderRepository);
    jest.resetModules();
  });

  it("Should be able retrieve a user order", async () => {
    fakeOrderRepository.create({
      date: new Date(),
      order_id: 1,
      user_id: 1
    })
    await expect(
      getByUserOrderUseCase.execute({user_id: 1})
    ).resolves.not.toThrow();
  });
});
