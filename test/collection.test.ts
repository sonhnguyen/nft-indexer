import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

describe("GET /unavail-endpoint", () => {
  it("should return 404", (done) => {
    request(app).get("/unavail-endpoint").expect(404, done);
  });
});

describe("GET /collection", () => {
  it("Should return errors for invalid contract address", done => {
    request(app)
      .get("/collection/0")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("should be a valid contract address");
        done();
      });
  });


  it("Should return correctly", done => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});
