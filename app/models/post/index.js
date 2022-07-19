const { _createPost } = require("./createPost");
const { _editPost } = require("./editPost");

module.exports = {
  createPostSchema: _createPost,
  editPostSchema: _editPost,
};
