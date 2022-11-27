const express = require("express");
const router = express.Router();

const db = require("../data/db");
const config = require("../config");
const Blog = require("../models/blog");
const Category = require("../models/category");


router.use("/blogs/category/:category_id", async (req, res) => {
    const id = req.params.category_id;
    try {
        const blogs = await Blog.findAll({where:{
            id:id,
            chek:true
        }});
        const categories = await Category.findAll();
        res.render("user/blogs", {
            title: "All News",
            blogs: blogs,
            categories: categories
        })
    }
    catch (err) {
        console.log(err);
    }

})


router.use("/blogs/:id", async (req, res) => {
    const id = req.params.id
    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            return res.render("user/blog-detail", {
                title: "detail page",
                blog: blog
            })
        } else {
            res.redirect("/blogs");
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.use('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        const categories = await Category.findAll();
        res.render("user/blogs", {
            title: "All News",
            blogs: blogs,
            categories: categories
        })
    }
    catch (err) {
        console.log(err);
    }
});


router.use('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll({where:{
            chek:true,
            home:true
        },
        raw: true
    });
        const categories = await Category.findAll();
        res.render("user/index", {
            title: "Home Page",
            blogs: blogs,
            categories: categories
        })
    }
    catch (err) {
        console.log(err);
    }
})






module.exports = router;