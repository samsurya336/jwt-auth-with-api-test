const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
// integer
const _schema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

exports.auth = (data) => {
  const valid = ajv.validate(_schema, data);
  console.log(" authSchema : ", valid);
  return {
    valid: valid,
    data: null,
  };
};
