const { USER_TYPES } = require("../../constants");
const { authSchema } = require("../../models/user");
const dbService = require("../../services/databaseServices");
const { passwordEncrypt } = require("../../services/encryption");
const { throwRequestError } = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports.signUp = async (req, res) => {
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
        value: req.body.email,
      },
    });

    if (userFromDb && userFromDb.email === body.email) {
      return throwRequestError("User already Exist, Please Login");
    } else {
      const encryptedPwd = await passwordEncrypt.cryptPassword(body.password);

      const result = dbService.create({
        collectionType: "USERS",
        data: {
          ...body,
          password: encryptedPwd,
          userType: req.params.userType,
        },
      });

      console.log("Successfully Created : ", result);

      return successResponse(res, {
        uid: result.uid,
      });
    }
  } catch (error) {
    return failureResponse(res, error);
  }
};
