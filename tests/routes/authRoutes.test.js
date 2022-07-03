//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const database = require("../../app/database");
const { should, expect } = require("chai");

chai.use(chaiHttp);
//Our parent block
describe("Signup Auth test", async () => {
  beforeEach((done) => {
    //Before each test we empty the database
    database.usersCollection = {};
    database.postsCollection = {};
    database.followersCollection = {};
    done();
  });
  /*
   * Test the /GET route
   */
  describe("/POST should signup valid user", async () => {
    it("it should create a valid user", () => {
      //"http://localhost:5000"

      chai
        .request("http://localhost:5000")
        .post("/api/v0.1/auth/NJA020SAJASOSU/signup")
        .set("Content-Type", "application/json")
        .send({
          email: "user1@gmail.com",
          password: "12345",
        })
        .end((err, res) => {
          console.log("RES : ", res);
          expect(res.body.success).eql(true);
          // done();
        });

      // let req = await chai
      //   .request("http://localhost:5000")
      //   .post("/api/v0.1/auth/NJA020SAJASOSU/signup");
      // const headers = {
      //   method: "post",
      //   header: {
      //     "content-type": "application/json",
      //   },
      //   // body: {
      //   //   email: "user1@gmail.com",
      //   //   password: "12345",
      //   // },
      // };
      // Object.entries(headers).forEach(function ([key, value]) {
      //   req = req.set(key, value);
      // });
      // const res = await req.send({
      //   email: "user1@gmail.com",
      //   password: "12345",
      // });
      // console.log("RES : ", res);
      // expect(res.success).eql(true);
      // done();
    });
  });
});
