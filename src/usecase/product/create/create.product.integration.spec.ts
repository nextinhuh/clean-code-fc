import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.use";

describe("Integration test to create an product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Product A", 50);

    await productRepository.create(product);

    const input = {
      name: "Product A",
      price: 50
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
        id: expect.any(String),
        name: "Product A",
        price: 50
      });
  });
});
