const { _logIn } = require("./login");
const { _signUp } = require("./signUp");

module.exports = {
  logInController: _logIn,
  signUpController: _signUp,
};
