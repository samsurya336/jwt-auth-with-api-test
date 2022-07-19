const { _createPost } = require("./createPost");
const { _editPost } = require("./editPost");

module.exports = {
  createPostController: _createPost,
  editPostController: _editPost,
};
