const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS;

exports.passwordEncrypt = {
  cryptPassword: (password) =>
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => hash),
  comparePassword: (password, hashPassword) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};
