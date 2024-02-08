import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create an product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Produto A",
        price: 50
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Produto A");
    expect(response.body.price).toBe(50);
  });

  it("should not create an product", async () => {
    const response = await request(app).post("/product").send({
      name: "Produto A",
    });
    expect(response.status).toBe(500);
  });

});
