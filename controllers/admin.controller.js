const { Blog, Category } = require("../models/model");
const db = require("../data/db");
const config = require("../config");
const fs = require('fs')
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });


exports.get_blog_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            res.render("admin/blog-delete", {
                title: "delete-blog",
                blog: blog,
                action:req.query.action
            })
        }
        return res.redirect("admin/blogs")
    }
    catch (err) {
        console.log(err);
    }
}

exports.post_blog_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByPk(id);
        if(blog){
            await blog.destroy();
            res.redirect("/admin/blogs?action=delete");
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.get_blog_edit = async (req, res) => {
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

}

exports.post_blog_edit = async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const text = req.body.text;
    let img = req.body.img;

    if (req.file) {
        img = req.file.filename;

        fs.unlink(".public/img/" + req.body.img, err => {
            console.log(err);
        })
    }

    const chek = req.body.chek == "on" ? 1 : 0;
    const home = req.body.home == "on" ? 1 : 0;
    const categoryId = req.body.categoryId;

    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            blog.title = title;
            blog.text = text;
            blog.img = img;
            blog.chek = chek;
            blog.home = home;
            blog.categoryId = categoryId;
            blog.save()

            return res.redirect("/admin/blogs?action=edit");
        }
        res.redirect("/admin/blogs");
    }
    catch (err) {
        console.log(err);
    }
}

exports.get_blog_create = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/blog-create', {
            title: "Blog-Creat",
            categories: categories
        });
    }
    catch (err) {
        console.log(err)
    }

}

exports.post_blog_create = async (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const img = req.file.filename;
    const chek = req.body.chek == "on" ? 1 : 0;
    const home = req.body.home == "on" ? 1 : 0;
    const categoryId = req.body.categoryId;

    try {
        await Blog.create({
            title: title,
            text: text,
            img: img,
            chek: chek,
            home: home,
            categoryId: categoryId,
        })
        res.redirect("/admin/blogs?action=create");
    }
    catch (err) {
        console.log(err);
    }

}

exports.index = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.render('admin/blog-list', {
            blogs: blogs,
            action: req.query.action
        });
    }
    catch (err) {
        console.log(err);
    }

}