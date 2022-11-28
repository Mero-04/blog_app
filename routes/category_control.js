const express = require('express')
const router = express.Router();

const categoryController = require("../controllers/category.controller")

router.get('/category/delete/:id', categoryController.get_category_delete);

router.post("/category/delete/:id", categoryController.post_category_delete);

router.get('/category/edit/:id', categoryController.get_category_edit);

router.post('/category/edit/:id', categoryController.post_category_edit);

router.get('/category/create', categoryController.get_category_create );

router.post('/category/create', categoryController.post_category_create);

router.get("/category", categoryController.index);

module.exports = router;