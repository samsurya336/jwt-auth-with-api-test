const { USER_TYPES } = require("../../constants");
const { userAuthSchema, adminAuthSchema } = require("../../models/user");
const dbService = require("../../services/databaseServices");
const { passwordEncrypt } = require("../../services/encryption");
const {
  throwRequestError,
  throwServerError,
} = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports._signUp = async (req, res) => {
  console.log("_signUp");
  try {
    if (
      !(
        USER_TYPES[req.params.userType] === "USER" ||
        USER_TYPES[req.params.userType] === "SUPER_ADMIN"
      )
    ) {
      return throwRequestError("Feature Not exist", {
        message: "provide a valid user type",
        log: `${req.params.userType}`,
      });
    }

    let response;
    if (USER_TYPES[req.params.userType] === "USER") {
      response = await userSignUp(req);
    } else if (USER_TYPES[req.params.userType] === "SUPER_ADMIN") {
      response = await adminSignUp(req);
    }

    return successResponse(res, {
      uid: response.uid,
    });
  } catch (error) {
    return failureResponse(res, error);
  }
};

const userSignUp = async (req) => {
  const body = req.body;

  if (!userAuthSchema(body).valid) {
    return throwRequestError("Invalid fields in the request body");
  }

  const [userFromDb] = dbService.read({
    collection: "USERS",
    filter: {
      operand: "email",
      value: body.email,
    },
  });

  console.log("userFromDb : ", userFromDb);

  if (userFromDb && userFromDb.email === body.email) {
    return throwRequestError("User already Exist, Please Login");
  }

  const encryptedPwd = await passwordEncrypt.cryptPassword(body.password);

  const result = dbService.create({
    collection: "USERS",
    data: {
      ...body,
      password: encryptedPwd,
      userType: req.params.userType,
    },
  });

  if (typeof result.uid !== "string") {
    return throwServerError("Unable to signup patient at the moment", {
      message: "dbService.create not returning uid ",
      log: result ? JSON.stringify(result) : "result is null",
    });
  }

  return {
    uid: result.uid,
  };
};

const adminSignUp = async (req) => {
  const body = req.body;

  if (!adminAuthSchema(body).valid) {
    return throwRequestError("Invalid fields in the request body");
  }

  if (process.env.ADMIN_ACCESS_KEY !== body.accessKey) {
    return throwRequestError("Invalid credentials", {
      message: "admin access key in invalid",
      log: `${body.accessKey}`,
    });
  }

  const [userFromDb] = dbService.read({
    collection: "USERS",
    filter: {
      operand: "email",
      value: body.email,
    },
  });

  if (userFromDb && userFromDb.email === body.email) {
    return throwRequestError("User already Exist, Please Login");
  }

  const [encryptedPwd, encryptedPin] = await Promise.all([
    passwordEncrypt.cryptPassword(body.password),
    passwordEncrypt.cryptPassword(body.pin),
  ]);

  const result = dbService.create({
    collection: "USERS",
    data: {
      ...body,
      password: encryptedPwd,
      userType: req.params.userType,
      pin: encryptedPin,
    },
  });

  if (typeof result.uid !== "string") {
    return throwServerError("Unable to signup patient at the moment", {
      message: "dbService.create not returning uid ",
      log: result ? JSON.stringify(result) : "result is null",
    });
  }

  return {
    uid: result.uid,
  };
};
