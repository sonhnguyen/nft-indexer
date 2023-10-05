import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

describe("GET /unavail-endpoint", () => {
  it("should return 404", (done) => {
    request(app).get("/unavail-endpoint").expect(404, done);
  });
});
let token: string;
describe("POST /login", () => {
  it("Should login", (done) => {
    request(app)
      .post("/login")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })

      .set("Accept", "application/json")
      .send({ username: "testing" })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.body).to.not.empty;
        token = res.body;
        done();
      });
  });
});

describe("GET /collection", () => {
  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });

  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});

describe("GET /collection/:contractAddress/stats", () => {
  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0/stats")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });

  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/stats")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/stats")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});

describe("GET /collection/:contractAddress/holders", () => {
  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0/holders")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });

  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/holders")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/holders")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});

describe("GET /collection/:contractAddress/nfts", () => {
  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0/nfts")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });

  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});

describe("GET /collection/:contractAddress/nfts/:tokenId", () => {
  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0/nfts/1")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });
  it("Should return errors for invalid tokenId", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/-1")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "tokenId must be integer and greater than 0"
        );
        done();
      });
  });

  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/4")
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get("/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/1")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});

describe("GET /collection/:contractAddress/nfts/:tokenId/sales", () => {
  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0/nfts/1/sales")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });
  it("Should return errors for invalid tokenId", (done) => {
    request(app)
      .get(
        "/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/-1/sales"
      )
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "tokenId must be integer and greater than 0"
        );
        done();
      });
  });
  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get(
        "/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/4/sales"
      )
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get(
        "/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/1/sales"
      )
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  });
});

describe("GET /collection/:contractAddress/nfts/:tokenId/ownerships", () => {
  it("Should return errors for unauthorized", (done) => {
    request(app)
      .get(
        "/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/4/ownerships"
      )
      .type("json")
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq("Unauthorized Request");
        done();
      });
  });

  it("Should return errors for invalid contract address", (done) => {
    request(app)
      .get("/collection/0/nfts/4/ownerships")
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "should be a valid contract address"
        );
        done();
      });
  });
  it("Should return errors for invalid tokenId", (done) => {
    request(app)
      .get(
        "/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/-4/ownerships"
      )
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.type).to.eq("application/json");
        expect(res.error).not.to.be.undefined;
        expect(res.body.error.message).to.be.eq(
          "tokenId must be integer and greater than 0"
        );
        done();
      });
  });

  it("Should return correctly", (done) => {
    request(app)
      .get(
        "/collection/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/nfts/4/ownerships"
      )
      .type("json")
      .set({ Authorization: `Bearer ${token}` })
      .expect("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.type).to.eq("application/json");
        expect(res.error).to.be.false;
        done();
      });
  }, 10000);
});
