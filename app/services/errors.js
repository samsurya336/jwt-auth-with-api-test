exports.throwRequestError = (message) => {
  let error = new Error(message);
  error.name = "requestError";
  error.code = 400;
  throw error;
};

exports.throwServerError = (message) => {
  let error = new Error(message);
  error.name = "serverError";
  error.code = 500;
  throw error;
};

exports.throwInvalidHeaderError = (message) => {
  let error = new Error(message);
  error.name = "unauthorized";
  error.code = 401;
  throw error;
};

exports.throwAccessTokenExpiredError = (message) => {
  let error = new Error(message);
  error.name = "unauthorized";
  error.code = 412;
  throw error;
};
