const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller")


router.use("/blogs/category/:category_id", userController.blog_category);


router.use("/blogs/:id", userController.blog_detail);

router.use('/blogs', userController.blogs_index);


router.use('/', userController.index);






module.exports = router;