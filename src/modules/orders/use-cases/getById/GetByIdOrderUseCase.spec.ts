import { FakeOrderRepository } from "../../repositories/fakes/FakeOrderRepository";
import { GetByIdOrderUseCase } from "./GetByIdOrderUseCase";

let getByIdOrderUseCase: GetByIdOrderUseCase;
let fakeOrderRepository: FakeOrderRepository;

const order = {
  order_id: 1,
  user_id: 1,
  date: new Date(),
  order_items: {
    order_item_id: 1,
    order_id: 1,
    product_id: 1,
    qty: 1,
    price: 1,
    sub_total: 1,
  },
};

describe("Retrieve Product", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    getByIdOrderUseCase = new GetByIdOrderUseCase(fakeOrderRepository);
    jest.resetModules();
  });

  it("Should be able retrieve a product", async () => {
    await fakeOrderRepository.create(order);
    await expect(
      getByIdOrderUseCase.execute({
        order_id: 1,
      })
    ).resolves.not.toThrow();
  });
});
