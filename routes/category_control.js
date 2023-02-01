const express = require('express')
const router = express.Router();

const categoryController = require("../controllers/category.controller")
const csrf = require("../middlewares/csrf")

router.get('/category/delete/:id',csrf,categoryController.get_category_delete);

router.post("/category/delete/:id", categoryController.post_category_delete);

router.get('/category/edit/:id', csrf, categoryController.get_category_edit);

router.post('/category/edit/:id', categoryController.post_category_edit);

router.get('/category/create', csrf, categoryController.get_category_create );

router.post('/category/create', categoryController.post_category_create);

router.get("/category", categoryController.index);

module.exports = router;