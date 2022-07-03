const express = require("express");
const { logInController, signUpController } = require("../controllers/auth");

const router = express.Router();

router.post("/:userType/signup", signUpController);
router.post("/:userType/login", logInController);

module.exports = router;
