exports.successResponse = (response, data) => {
  const _data = data ? data : null;
  console.log("successResponse : ", _data);
  return response.status(200).send({
    success: true,
    data: _data,
  });
};

exports.failureResponse = (response, error) => {
  const _message = error.message ? error.message : null;
  const _code = error.code ? error.code : 500;
  return response.status(_code).send({
    success: false,
    message: _message,
    ...(process.env.STAGING === "dev" && typeof error.stack === "string"
      ? {
          stack: error.stack,
        }
      : {}),
    ...(process.env.STAGING === "dev" && error.info
      ? {
          info: {
            ...error.info,
          },
        }
      : {}),
  });
};
