const express = require('express')
const router = express.Router();

const authController = require("../controllers/auth.controller");


router.post("/register", authController.post_register);
router.get("/register", authController.get_register);
router.post("/login", authController.post_login);
router.get("/login", authController.get_login);

module.exports = router;