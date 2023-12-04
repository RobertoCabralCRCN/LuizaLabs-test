import { FakeOrderRepository } from "../../repositories/fakes/FakeOrderRepository";
import { GetAllOrdersUseCase } from "./GetAllOrdersUserCase";


let fakeOrderRepository: FakeOrderRepository;
let getAllOrdersUseCase: GetAllOrdersUseCase;



describe("List Order", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    getAllOrdersUseCase = new GetAllOrdersUseCase(fakeOrderRepository);

    jest.resetModules();
  });

  it("Should be able to list a order", async () => {
    await expect(getAllOrdersUseCase.execute({
      skip: 1,
      limit: 1
    })).resolves.not.toThrow();
  });
});
