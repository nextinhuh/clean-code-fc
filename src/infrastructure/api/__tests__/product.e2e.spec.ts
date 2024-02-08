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

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Produto A",
        price: 50
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Produto B",
        price: 100
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Produto A");
    expect(product.price).toBe(50);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Produto B");
    expect(product2.price).toBe(100);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Produto A</name>`);
    expect(listResponseXML.text).toContain(`<price>50</price>`);
    expect(listResponseXML.text).toContain(`<name>Produto B</name>`);
    expect(listResponseXML.text).toContain(`<price>100</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
