const { editPostSchema } = require("../../models/post");
const databaseServices = require("../../services/databaseServices");
const dbService = require("../../services/databaseServices");
const {
  throwRequestError,
  throwServerError,
  throwForbiddenError,
  throwNotFoundError,
} = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports._editPost = async (req, res) => {
  console.log("_editPost");
  const body = req.body;
  try {
    if (!editPostSchema(body).valid) {
      return throwRequestError("Invalid fields in the request body");
    }

    console.log("Payload UID : ", req.headerPayload.uid);

    const [userFromDb] = dbService.read({
      collection: "USERS",
      filter: {
        operand: "uid",
        value: req.headerPayload.uid,
      },
    });

    if (!userFromDb) {
      return throwNotFoundError("User not allowed to edit a Post");
    }

    if (
      !(userFromDb.uid === req.headerPayload.uid && userFromDb.uid === body.uid)
    ) {
      return throwForbiddenError("Invalid credentials");
    }

    const postFromDb = dbService.read({
      collection: "POSTS",
      documentId: body.postId,
    });

    if (!postFromDb) {
      return throwNotFoundError("Post not found");
    }

    if (
      !(postFromDb.uid === req.headerPayload.uid && postFromDb.uid === body.uid)
    ) {
      return throwForbiddenError("Invalid credentials");
    }

    const response = databaseServices.update({
      collection: "POSTS",
      documentId: body.postId,
      data: body,
    });

    if (!response) {
      return throwServerError("unable to edit post");
    }

    return successResponse(res, {
      message: "Post edited successfully",
      postId: body.postId,
    });
  } catch (error) {
    return failureResponse(res, error);
  }
};
