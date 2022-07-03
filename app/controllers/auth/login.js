const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../../constants");
const { authSchema } = require("../../models/user");
const dbService = require("../../services/databaseServices");
const { passwordEncrypt } = require("../../services/encryption");
const { throwRequestError } = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports.logIn = async (req, res) => {
  const body = req.body;
  try {
    if (USER_TYPES[req.params.userType] !== "USER") {
      return throwRequestError("Feature Not exist");
    }

    if (!authSchema(body).valid) {
      return throwRequestError("Invalid fields in the request body");
    }

    const userFromDb = dbService.read({
      collectionType: "USERS",
      filter: {
        operand: "email",
        value: body.email,
      },
    });

    if (!userFromDb) {
      return throwRequestError("User does not Exist, Please Signup");
    }

    if (userFromDb.email !== body.email) {
      return throwRequestError("Invalid credentials");
    }

    const isPwdMatched = await passwordEncrypt.comparePassword(
      body.password,
      userFromDb.password
    );

    if (!isPwdMatched) {
      return throwRequestError("Invalid credentials");
    }

    const token = jwt.sign({ uid: userFromDb.uid }, process.env.JWT_SECRET, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: 86400, // 24 hours
    });

    return successResponse(res, {
      token: token,
    });
  } catch (error) {
    return failureResponse(res, error);
  }
};
