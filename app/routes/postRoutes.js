const express = require("express");
const {
  createPostController,
  editPostController,
} = require("../controllers/posts");
const {
  accessTokenValidationMiddleware,
} = require("../middlewares/accessTokenValidationMiddleware");

const router = express.Router();

router.post("/create", [accessTokenValidationMiddleware], createPostController);

router.patch("/edit", [accessTokenValidationMiddleware], editPostController);

router.delete(
  "/delete",
  [accessTokenValidationMiddleware],
  createPostController
);

router.get(
  "/getWithPostId",
  [accessTokenValidationMiddleware],
  createPostController
);

router.get(
  "/getUserAllPosts",
  [accessTokenValidationMiddleware],
  createPostController
);

module.exports = router;
