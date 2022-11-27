const express = require('express')
const router = express.Router();

const db = require("../data/db");
const config = require("../config");
const fs= require('fs')
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({dest: "./public/img"});

const Blog = require("../models/blog");
const Category = require("../models/category");
const { BlockList } = require('net');

router.get('/blogs/delete/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const[blogs, ] = await db.execute("select * from blogs where id=?", [id]);
        const blog = blogs[0];

         res.render("admin/blog-delete",{
            title:"delete-blog",
            blog:blog
        })
    }
    catch(err){
        console.log(err);
    }
});

router.post('/blogs/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        await db.execute("delete from blogs where id=?", [id]);
        res.redirect("/admin/blogs?action=delete");
    }
    catch(err){
        console.log(err);
    }
});

router.get('/blogs/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByPk(id);
        const categories = await Category.findAll();
        if (blog) {
            return res.render('admin/blog-edit', {
                title: blog.title,
                blog: blog,
                categories: categories
            });
        }
    }
    catch (err) {
        console.log(err);
    }

});

router.post('/blogs/edit/:id', imageUpload.upload.single("img"), async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const text = req.body.text;
    let img = req.body.img;

    if(req.file){
        img = req.file.filename;
        
        fs.unlink(".public/img/" + req.body.img, err =>{
            console.log(err);
        })
    }

    const chek = req.body.chek == "on" ? 1 : 0;
    const home = req.body.home == "on" ? 1 : 0;
    const category_id = req.body.category_id;

    try {
        const blog = await Blog.findByPk(id);
        if(blog) {
            blog.title = title;
            blog.text = text;
            blog.img = img;
            blog.chek = chek;
            blog.home = home;
            blog.category_id=category_id;
            blog.save()
            
            return res.redirect("/admin/blogs?action=edit");
        }
        res.redirect("/admin/blogs");
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/blogs/create', async (req, res) => {
    try {
        res.render('admin/blog-create', {
            title: "Blog-Creat"
        });
    }
    catch (err) {
        console.log(err)
    }

});

router.post('/blogs/create', imageUpload.upload.single("img"), async (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const img = req.file.filename;
    const category_id = req.body.category_id;
    const chek = req.body.chek == "on" ? 1 : 0;
    const home = req.body.home == "on" ? 1 : 0;

    try {
        await Blog.create({
            title: title,
            text: text,
            img: img,
            category_id: category_id,
            chek:chek,
            home: home
        })
        res.redirect("/admin/blogs?action=create");
    }
    catch (err) {
        console.log(err);
    }

});

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.render('admin/blog-list', {
            blogs: blogs,
            action:req.query.action
        });
    }
    catch (err) {
        console.log(err);
    }

});



module.exports = router;