const { Blog, Category } = require("../models/model");
const db = require("../data/db");
const config = require("../config");

exports.blog_category = async (req, res) => {
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

}

exports.blog_detail = async (req, res) => {
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
}

exports.blogs_index = async (req, res) => {
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
}

exports.index = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            where: {
                chek: true,
                home: true
            },
            raw: true
        });
        const categories = await Category.findAll();
        res.render("user/index", {
            title: "Home Page",
            blogs: blogs,
            categories: categories,
            isAuth: req.session.isAuth
        });
    }
    catch (err) {
        console.log(err);
    }
}