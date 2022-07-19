const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const {
  clearUsersCollection,
  clearPostsCollection,
  clearFollowersCollection,
} = require("../database");
const {
  clearUsersCollectionTest,
  clearPostsCollectionTest,
  clearFollowersCollectionTest,
} = require("../services/databaseServices");
const { baseUrl } = require("../services/utils");

exports.cleanUpDataBase = () => {
  clearUsersCollectionTest();
  clearPostsCollectionTest();
  clearFollowersCollectionTest();
};

exports.signupUserSeed = async ({
  email = "user1@gmail.com",
  password = "123456789",
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const bodyContent = JSON.stringify({
    email: email,
    password: password,
  });
  const response = await fetch(
    `${baseUrl()}/api/v0.1/auth/NJA020SAJASOSU/signup`,
    {
      method: "POST",
      body: bodyContent,
      headers: headers,
    }
  );
  // console.log("RESPONSE : ", response.body);
  const result = await response.json();
  console.log("result : ", result);
  return result.data;
};

exports.loginUserSeed = async ({
  email = "user1@gmail.com",
  password = "123456789",
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const bodyContent = JSON.stringify({
    email: email,
    password: password,
  });
  const response = await fetch(
    `${baseUrl()}/api/v0.1/auth/NJA020SAJASOSU/login`,
    {
      method: "POST",
      body: bodyContent,
      headers: headers,
    }
  );
  const result = await response.json();
  return result.data;
};

exports.createPostSeed = async ({
  accessToken,
  body = {
    uid: null,
    message: "First post message",
    title: "First Post",
    availability: "PUBLIC",
    authorName: "surya",
  },
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${accessToken}`,
  };
  const bodyContent = JSON.stringify({ ...body });
  const response = await fetch(`${baseUrl()}/api/v0.1/post/create`, {
    method: "POST",
    body: bodyContent,
    headers: headers,
  });
  const result = await response.json();
  return result.data;
};
