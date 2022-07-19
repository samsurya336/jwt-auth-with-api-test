exports.throwRequestError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "requestError";
  error.code = 400;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};

// user is unauthenticated
exports.throwUnauthorizedError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "unauthorized";
  error.code = 401;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};

//user does not have permission
exports.throwForbiddenError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "forbidden";
  error.code = 403;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};

// result not found
exports.throwNotFoundError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "notfound";
  error.code = 404;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};

exports.throwServerError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "serverError";
  error.code = 500;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};

exports.throwInvalidHeaderError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "unauthorized";
  error.code = 401;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};

exports.throwAccessTokenExpiredError = (message, info = {}) => {
  let error = new Error(message);
  error.name = "unauthorized";
  error.code = 412;
  error.info = typeof info.message === "string" ? { ...info } : null;
  throw error;
};
