const express = require("express");
const { createPostController } = require("../controllers/posts");
const {
  accessTokenValidationMiddleware,
} = require("../middlewares/accessTokenValidationMiddleware");

const router = express.Router();

router.post(
  "/:userType/create",
  [accessTokenValidationMiddleware],
  createPostController
);

router.patch(
  "/:userType/update",
  [accessTokenValidationMiddleware],
  createPostController
);

router.delete(
  "/:userType/delete",
  [accessTokenValidationMiddleware],
  createPostController
);

router.get(
  "/:userType/getWithPostId",
  [accessTokenValidationMiddleware],
  createPostController
);

router.get(
  "/:userType/getUserAllPosts",
  [accessTokenValidationMiddleware],
  createPostController
);

module.exports = router;
