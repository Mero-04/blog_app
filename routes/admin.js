const express = require('express')
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const csrf = require("../middlewares/csrf")

const adminController = require("../controllers/admin.controller");


router.get('/blogs/delete/:id', csrf, adminController.get_blog_delete);

router.post('/blogs/delete/:id', adminController.post_blog_delete);

router.get('/blogs/edit/:id', csrf, adminController.get_blog_edit);

router.post('/blogs/edit/:id', imageUpload.upload.single("img"), adminController.post_blog_edit);

router.get('/blogs/create', csrf, adminController.get_blog_create);

var docUpdate = imageUpload.upload.fields([{ name: 'img', maxCount: 1 }, { name: 'file1', maxCount: 1 }]);
router.post('/blogs/create',docUpdate, adminController.post_blog_create);

router.get('/blogs', adminController.index);



module.exports = router;