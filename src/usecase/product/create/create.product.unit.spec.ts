import CreateProductUseCase from "./create.product.use";

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  describe("Unit Test to create an product use case", () => {
    it("should create an product", async () => {
      const productMockRepository = MockRepository();
      const usecase = new CreateProductUseCase(productMockRepository);

      const input = {
        name: "Product A",
        price: 50
      }

      const output = await usecase.execute(input);
  
      expect(output).toEqual({
        id: expect.any(String),
        name: "Product A",
        price: 50
      });
    });
 
    it("should thrown an error when name is missing", async () => {
        const productMockRepository = MockRepository();
        const usecase = new CreateProductUseCase(productMockRepository);
    
        const input = {
            name: "",
            price: 50
          }
    
        await expect(usecase.execute(input)).rejects.toThrow(
          "Name is required"
        );
      });
    
      it("should thrown an error when price is below 0", async () => {
        const productMockRepository = MockRepository();
        const usecase = new CreateProductUseCase(productMockRepository);
    
        const input: any = {
            name: "Product A",
            price: -1
        }
    
        await expect(usecase.execute(input)).rejects.toThrow(
          "Price must be greater than zero"
        );
      });
  });