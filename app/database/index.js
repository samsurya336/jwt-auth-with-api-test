let _users = {};
let _posts = {};
let _followers = {};

const clearUsersCollection = () => {
  _users = {};
  console.log("clearUsersCollection : ", _users);
};
const clearPostsCollection = () => {
  _posts = {};
};
const clearFollowersCollection = () => {
  _followers = {};
};

module.exports = {
  usersCollection: _users,
  postsCollection: _posts,
  followersCollection: _followers,
  clearUsersCollection: clearUsersCollection,
  clearPostsCollection: clearPostsCollection,
  clearFollowersCollection: clearFollowersCollection,
};
