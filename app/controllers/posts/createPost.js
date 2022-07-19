const { createPostSchema } = require("../../models/post");
const dbService = require("../../services/databaseServices");
const {
  throwRequestError,
  throwServerError,
} = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports._createPost = async (req, res) => {
  const body = req.body;
  try {
    if (!createPostSchema(body).valid) {
      return throwRequestError("Invalid fields in the request body");
    }

    console.log("_createPost");

    console.log("Payload UID : ", req.headerPayload.uid);

    const [userFromDb] = dbService.read({
      collection: "USERS",
      filter: {
        operand: "uid",
        value: req.headerPayload.uid,
      },
    });

    if (!userFromDb) {
      return throwRequestError("User not allowed to create a Post");
    }

    if (userFromDb.uid !== req.headerPayload.uid) {
      return throwRequestError("Invalid credentials");
    }

    const result = dbService.create({
      collection: "POSTS",
      data: {
        ...body,
      },
    });

    if (typeof result.documentId !== "string") {
      return throwServerError("Unable to create post");
    }

    return successResponse(res, {
      message: "Post created successfully",
      postId: result.documentId,
    });
  } catch (error) {
    return failureResponse(res, error);
  }
};
