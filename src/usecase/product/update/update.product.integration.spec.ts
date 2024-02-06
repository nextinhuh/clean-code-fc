import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test to update an product use case", () => {
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

  it("should update an product", async () => {
    const productRepository = new ProductRepository();
    const updateUsecase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product A", 50);
    await productRepository.create(product);

    const input = {
        id: product.id,
        name: 'Product B',
        price: 100
    };

    const output = await updateUsecase.execute(input);

    expect(output).toEqual(input);
  });
});
