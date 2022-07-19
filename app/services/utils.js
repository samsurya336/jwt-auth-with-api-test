exports.cleanUpObject = (object, keys) => {
  const result = {
    ...object,
  };
  for (const _key of keys) {
    if (typeof _key === "string") {
      delete result[_key];
    }
  }
  return result;
};

exports.baseUrl = () => {
  if (process.env.STAGING === "local") {
    return "http://localhost:5000";
  } else if (process.env.STAGING === "dev") {
    return "http://localhost:5000";
  } else if (process.env.STAGING === "uat") {
    return "user acceptance testing url";
  } else if (process.env.STAGING === "prod") {
    return "production url";
  } else {
    return "http://localhost:5000";
  }
};

exports.errorLog = (error) => {
  console.error(error);
};
