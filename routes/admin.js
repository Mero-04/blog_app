const express = require('express')
const router = express.Router();

router.get('/blog-lists/:id', (req,res) =>{
    res.render('admin/blog-list');
})

router.get('/blog-create', (req,res) =>{
    res.render('admin/blog-create');
})

router.get('/blog-edit', (req,res) =>{
    res.render('admin/blog-edit');
})




module.exports = router;