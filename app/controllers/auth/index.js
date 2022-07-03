const { logIn } = require("./login");
const { signUp } = require("./signUp");

module.exports = {
  logInController: logIn,
  signUpController: signUp,
};
