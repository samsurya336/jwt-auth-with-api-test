const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
// integer
const _schema = {
  type: "object",
  properties: {
    uid: { type: "string" },
    message: { type: "string" },
    title: { type: "string" },
    availability: {
      enum: ["PRIVATE", "PUBLIC", "FOLLOWERS"],
    },
    authorName: { type: "string" },
  },
  required: ["uid", "message", "title", "availability", "authorName"],
  additionalProperties: false,
};

exports.createPost = (data) => {
  const valid = ajv.validate(_schema, data);
  console.log(" createPostSchema : ", valid);
  return {
    valid: valid,
    data: null,
  };
};
