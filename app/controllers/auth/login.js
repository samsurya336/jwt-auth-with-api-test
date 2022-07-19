const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../../constants");
const { userAuthSchema, adminAuthSchema } = require("../../models/user");
const dbService = require("../../services/databaseServices");
const { passwordEncrypt } = require("../../services/encryption");
const { throwRequestError } = require("../../services/errors");
const { successResponse, failureResponse } = require("../../services/response");

exports._logIn = async (req, res) => {
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
      response = await userLogin(req);
    } else if (USER_TYPES[req.params.userType] === "SUPER_ADMIN") {
      response = await adminLogin(req);
    }

    // "realm_access": {
    //   "roles": [
    //     "hfr",
    //     "offline_access",
    //     "healthId",
    //     "gateway"
    //   ]
    // },
    // "resource_access": {
    //   "account": {
    //     "roles": [
    //       "manage-account",
    //       "manage-account-links",
    //       "view-profile"
    //     ]
    //   },
    //   "gateway": {
    //     "roles": [
    //       "uma_protection"
    //     ]
    //   }
    // }

    return successResponse(res, {
      uid: response.uid,
      token: response.token,
    });
  } catch (error) {
    return failureResponse(res, error);
  }
};

const userLogin = async (req) => {
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

  const token = jwt.sign(
    {
      uid: userFromDb.uid,
      accessDetails: {
        userType: req.params.userType,
      },
    },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: 86400, // 24 hours
    }
  );

  return {
    uid: userFromDb.uid,
    token: token,
  };
};

const adminLogin = async (req) => {
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

  if (!userFromDb) {
    return throwRequestError("User does not Exist, Please Signup");
  }

  if (userFromDb.email !== body.email) {
    return throwRequestError("Invalid credentials");
  }

  const [isPwdMatched, isPinMatched] = await Promise.all([
    passwordEncrypt.comparePassword(body.password, userFromDb.password),
    passwordEncrypt.comparePassword(body.pin, userFromDb.pin),
  ]);

  if (!isPwdMatched || !isPinMatched) {
    return throwRequestError("Invalid credentials");
  }

  const token = jwt.sign(
    {
      uid: userFromDb.uid,
      accessDetails: {
        userType: req.params.userType,
      },
    },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: 86400, // 24 hours
    }
  );

  return {
    uid: userFromDb.uid,
    token: token,
  };
};
