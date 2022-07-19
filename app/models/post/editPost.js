const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
// integer
const _schema = {
  type: "object",
  properties: {
    uid: { type: "string" },
    postId: { type: "string" },
    message: { type: "string" },
    title: { type: "string" },
    availability: {
      enum: ["PRIVATE", "PUBLIC", "FOLLOWERS"],
    },
  },
  required: ["uid", "postId"],
  additionalProperties: false,
};

exports._editPost = (data) => {
  const valid = ajv.validate(_schema, data);
  return {
    valid: valid,
    data: null,
  };
};
