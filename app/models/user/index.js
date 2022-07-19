const { _userAuth, _adminAuth } = require("./auth");

module.exports = {
  userAuthSchema: _userAuth,
  adminAuthSchema: _adminAuth,
};
