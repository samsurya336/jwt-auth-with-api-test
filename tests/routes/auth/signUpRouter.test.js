//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const { cleanUpDataBase, signupUserSeed } = require("../../../app/mocks/seeds");
const { baseUrl, errorLog } = require("../../../app/services/utils");

chai.use(chaiHttp);
const email = "user_1@gmail.com";
const password = "123456789";

//Our parent block
describe("SIGNUP auth test", async () => {
  let uid;

  describe("Should SIGNUP user ", async () => {
    beforeEach(async () => {
      cleanUpDataBase();
    });

    it("should login user when valid data is provided", async () => {
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/signup");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        email: email,
        password: password,
      });
      expect(res.body.success).eql(true);
      expect(res.body.data.uid).to.be.an("string");
    });
  });

  describe("Should not SIGNUP user ", async () => {
    beforeEach(async () => {
      cleanUpDataBase();
    });

    it("throw [Feature Not exist] error and don't signup user", async () => {
      // signup with different userType
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA004SAJASOSU/signup");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        email: email,
        password: password,
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("Feature Not exist");
      expect(res.body.data).to.be.an("undefined");
    });

    it("throw [User already Exist, Please Login] error when tried to signup with exist email ", async () => {
      await signupUserSeed({
        email: email,
        password: password,
      });

      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/signup");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        email: email,
        password: password,
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("User already Exist, Please Login");
      expect(res.body.data).to.be.an("undefined");
    });

    it("throw [Invalid fields in the request body] error when extra properties provided", async () => {
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/signup");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        email: email,
        password: "5678910",
        extraProperty: "this_is_an_extra_property",
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("Invalid fields in the request body");
      expect(res.body.data).to.be.an("undefined");
    });

    it("throw [Invalid fields in the request body] error when password not provided", async () => {
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/signup");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        email: email,
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("Invalid fields in the request body");
      expect(res.body.data).to.be.an("undefined");
    });

    it("throw [Invalid fields in the request body] error when email not provided", async () => {
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/signup");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        password: "5678910",
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("Invalid fields in the request body");
      expect(res.body.data).to.be.an("undefined");
    });
  });
});
