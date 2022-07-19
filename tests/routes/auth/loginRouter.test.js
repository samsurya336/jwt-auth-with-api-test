//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const { cleanUpDataBase, signupUserSeed } = require("../../../app/mocks/seeds");
const { baseUrl, errorLog } = require("../../../app/services/utils");

chai.use(chaiHttp);
const email = "user_1@gmail.com";
const password = "123456789";

describe("LOGIN auth test", async () => {
  let uid;

  describe("Should LOGIN user ", async () => {
    beforeEach(async () => {
      cleanUpDataBase();
      const signupResponse = await signupUserSeed({
        email: email,
        password: password,
      });
      uid = signupResponse.uid;
    });

    it("should login user when valid data is provided", async () => {
      //"http://localhost:5000"

      // chai
      //   .request("http://localhost:5000")
      //   .post("/api/v0.1/auth/NJA020SAJASOSU/signup")
      //   .set("Content-Type", "application/json")
      //   .send({
      //     email: "user1@gmail.com",
      //     password: "12345",
      //   })
      //   .end((err, res) => {
      //     console.log("RES : ", res);
      //     expect(res.body.success).eql(true);
      //     // done();
      //   });

      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/login");
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
      expect(res.body.data.token).to.be.an("string");
    });
  });

  describe("Should not LOGIN user ", async () => {
    beforeEach(async () => {
      cleanUpDataBase();
      const signupResponse = await signupUserSeed({
        email: email,
        password: password,
      });
      errorLog("signupResponse");
      errorLog(signupResponse);
      uid = signupResponse.uid;
    });

    it("throw [Feature Not exist] error and don't login user", async () => {
      // login with different userType
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA004SAJASOSU/login");
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

    it("throw [User does not Exist, Please Signup] error when wrong email provided", async () => {
      // login with un exist email
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/login");
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
        email: "user_2@gmail.com",
        password: password,
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("User does not Exist, Please Signup");
      expect(res.body.data).to.be.an("undefined");
    });

    it("throw [Invalid credentials] error when wrong password entered", async () => {
      // login with different userType
      let req = chai
        .request(baseUrl())
        .post("/api/v0.1/auth/NJA020SAJASOSU/login");
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
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("Invalid credentials");
      expect(res.body.data).to.be.an("undefined");
    });
  });
});
