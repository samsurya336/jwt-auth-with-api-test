const { createPostSchema } = require("../../models/post");
const dbService = require("../../services/databaseServices");
const {
  throwRequestError,
  throwServerError,
} = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports.createPost = async (req, res) => {
  const body = req.body;
  try {
    if (!createPostSchema(body).valid) {
      return throwRequestError("Invalid fields in the request body");
    }

    console.log("Payload UID : ", req.payload.uid);

    const userFromDb = dbService.read({
      collectionType: "USERS",
      filter: {
        operand: "uid",
        value: req.payload.uid,
      },
    });

    if (!userFromDb) {
      return throwRequestError("User not allowed to create a Post");
    }

    if (userFromDb.uid !== req.payload.uid) {
      return throwRequestError("Invalid credentials");
    }

    const result = dbService.create({
      collectionType: "POSTS",
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
