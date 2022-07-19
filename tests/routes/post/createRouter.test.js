//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const {
  cleanUpDataBase,
  signupUserSeed,
  loginUserSeed,
} = require("../../../app/mocks/seeds");
const { baseUrl, errorLog } = require("../../../app/services/utils");

chai.use(chaiHttp);
const email = "user_1@gmail.com";
const password = "123456789";

describe("POST test", async () => {
  let uid;
  let accessToken;

  describe("Should CREATE POST ", async () => {
    beforeEach(async () => {
      cleanUpDataBase();
      await signupUserSeed({
        email: email,
        password: password,
      });
      const loginResponse = await loginUserSeed({
        email: email,
        password: password,
      });
      uid = loginResponse.uid;
      accessToken = loginResponse.token;
      errorLog(loginResponse);
    });

    it("should create Post for user", async () => {
      let req = chai.request(baseUrl()).post("/api/v0.1/post/create");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        uid: uid,
        message: "First post message",
        title: "First Post",
        availability: "PUBLIC",
        authorName: "surya",
      });
      expect(res.body.success).eql(true);
      expect(res.body.data.postId).to.be.an("string");
    });
  });

  describe("Should not CREATE POST for user ", async () => {
    beforeEach(async () => {
      cleanUpDataBase();
      await signupUserSeed({
        email: email,
        password: password,
      });
      const loginResponse = await loginUserSeed({
        email: email,
        password: password,
      });
      uid = loginResponse.uid;
      accessToken = loginResponse.token;
    });

    it("throw [User not allowed to create a Post] error when user not exist in database", async () => {
      cleanUpDataBase();

      let req = chai.request(baseUrl()).post("/api/v0.1/post/create");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        uid: uid,
        message: "First post message",
        title: "First Post",
        availability: "PUBLIC",
        authorName: "surya",
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("User not allowed to create a Post");
      expect(res.body.data).to.be.an("undefined");
    });

    it("throw [Invalid fields in the request body] error when missing fields in body", async () => {
      let req = chai.request(baseUrl()).post("/api/v0.1/post/create");
      const headers = {
        method: "post",
        header: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      };
      Object.entries(headers).forEach(function ([key, value]) {
        req = req.set(key, value);
      });
      const res = await req.send({
        uid: uid,
        title: "First Post",
        availability: "PUBLIC",
        authorName: "surya",
      });
      expect(res.body.success).eql(false);
      expect(res.body.message).eql("Invalid fields in the request body");
      expect(res.body.data).to.be.an("undefined");
    });
  });
});
