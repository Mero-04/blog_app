const express = require('express')
const router = express.Router();

const authController = require("../controllers/auth.controller");
const csrf = require("../middlewares/csrf")

router.get("/logout",csrf, authController.get_logout);
router.post("/register", authController.post_register);
router.get("/register",csrf, authController.get_register);
router.post("/login", authController.post_login);
router.get("/login", csrf, authController.get_login);

module.exports = router;