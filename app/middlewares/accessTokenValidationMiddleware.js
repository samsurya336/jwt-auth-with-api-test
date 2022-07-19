const { throwInvalidHeaderError } = require("../services/errors");
const jwt = require("jsonwebtoken");
const { failureResponse } = require("../services/response");

exports.accessTokenValidationMiddleware = async (req, res, next) => {
  try {
    if (!req.headers) throwInvalidHeaderError("Invalid credentials");
    console.log("req.headers : ", req.headers);
    if (!req.headers["authorization"])
      throwInvalidHeaderError("Auth token not provided");

    if (!req.headers["content-type"])
      throwInvalidHeaderError("Invalid credentials");

    if (req.headers["authorization"].split(" ")[0] !== "Bearer")
      throwInvalidHeaderError("Invalid credentials");

    const token = req.headers["authorization"].split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.headerPayload = {
      ...payload,
    };

    next();
  } catch (error) {
    console.log("ERROR : ", error);
    return failureResponse(res, error);
  }
};
