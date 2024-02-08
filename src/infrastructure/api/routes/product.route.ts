import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.use";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    const output = await useCase.execute({});
  
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.listXML(output)),
    });
  });