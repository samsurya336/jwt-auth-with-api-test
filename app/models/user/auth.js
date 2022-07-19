const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
// integer
const _userAuthSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

exports._userAuth = (data) => {
  const valid = ajv.validate(_userAuthSchema, data);
  console.log(" authSchema : ", valid);
  return {
    valid: valid,
    data: null,
  };
};

const _adminAuthSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    pin: { type: "string" },
    accessKey: { type: "string" },
  },
  required: ["email", "password", "pin", "accessKey"],
  additionalProperties: false,
};

exports._adminAuth = (data) => {
  const valid = ajv.validate(_adminAuthSchema, data);
  return {
    valid: valid,
    data: null,
  };
};
