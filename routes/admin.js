const express = require('express')
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });

const adminController = require("../controllers/admin.controller");

router.get('/blogs/delete/:id', adminController.get_blog_delete);

router.post('/blogs/delete/:id', adminController.post_blog_delete);

router.get('/blogs/edit/:id', adminController.get_blog_edit);

router.post('/blogs/edit/:id', imageUpload.upload.single("img"), adminController.post_blog_edit);

router.get('/blogs/create', adminController.get_blog_create);

router.post('/blogs/create', imageUpload.upload.single("img"), adminController.post_blog_create);

router.get('/blogs', adminController.index);



module.exports = router;