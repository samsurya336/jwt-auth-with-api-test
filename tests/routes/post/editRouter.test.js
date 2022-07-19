//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const {
  cleanUpDataBase,
  signupUserSeed,
  loginUserSeed,
  createPostSeed,
} = require("../../../app/mocks/seeds");
const { baseUrl, errorLog } = require("../../../app/services/utils");

chai.use(chaiHttp);
const email = "user_1@gmail.com";
const password = "123456789";

describe("POST test", async () => {
  let uid;
  let accessToken;
  let postId;

  describe("Should EDIT POST ", async () => {
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

      const createPostSeedResponse = await createPostSeed({
        accessToken: accessToken,
        body: {
          uid: uid,
          message: "First post message",
          title: "First Post",
          availability: "PUBLIC",
          authorName: "surya",
        },
      });
      postId = createPostSeedResponse.postId;
    });

    it("should edit Message of Post by user", async () => {
      let req = chai.request(baseUrl()).post("/api/v0.1/post/edit");
      const headers = {
        method: "patch",
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
        postId: postId,
        uid: uid,
        message: "First post message edited",
      });
      expect(res.body.success).eql(true);
      expect(res.body.data.message).eql("Post edited successfully");
      expect(res.body.data.postId).to.be.an("string");
    });

    it("should edit Title of Post by user", async () => {
      let req = chai.request(baseUrl()).post("/api/v0.1/post/edit");
      const headers = {
        method: "patch",
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
        postId: postId,
        uid: uid,
        title: "First post title message edited",
      });
      expect(res.body.success).eql(true);
      expect(res.body.data.message).eql("Post edited successfully");
      expect(res.body.data.postId).to.be.an("string");
    });

    it("should edit availability of Post by user", async () => {
      let req = chai.request(baseUrl()).post("/api/v0.1/post/edit");
      const headers = {
        method: "patch",
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
        postId: postId,
        uid: uid,
        availability: "PRIVATE",
      });
      expect(res.body.success).eql(true);
      expect(res.body.data.message).eql("Post edited successfully");
      expect(res.body.data.postId).to.be.an("string");
    });
  });
});
