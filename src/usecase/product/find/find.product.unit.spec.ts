import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const prpduct = new Product("123", "Product A", 50);

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(prpduct)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  describe("Unit Test to find product use case", () => {
    it("should find a product", async () => {
      const productMockRepository = MockRepository();
      const usecase = new FindProductUseCase(productMockRepository);
  
      const input = {
        id: "123",
      };
  
      const output = {
        id: "123",
        name: "Product A",
        price: 50
      };
  
      const result = await usecase.execute(input);
  
      expect(result).toEqual(output);
    });
 
    it("should not find a customer", async () => {
      const productMockRepository = MockRepository();
      productMockRepository.find.mockImplementation(() => {
        throw new Error("Product not found");
      });
      const usecase = new FindProductUseCase(productMockRepository);
  
      const input = {
        id: "123",
      };
  
      expect(() => {
        return usecase.execute(input);
      }).rejects.toThrow("Product not found");
    });
  });