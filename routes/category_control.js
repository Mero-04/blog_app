const express = require('express')
const router = express.Router();

const db = require("../data/db");
const config = require("../config");

const Blog = require("../models/blog");
const Category = require("../models/category");

router.get('/category/delete/:id', async (req,res) =>{
    const id = req.params.id;
    try{
        const[categories, ] = await db.execute("select * from category where id=?", [id]);
        res.render("admin/category/category-delete",{
            categories:categories,
            action:req.query.action
        })
    }
    catch(err){
        console.log(err);
    }
});

router.post("/category/delete/:id", async (req,res) => {
    const id = req.params.id;    
    try{
        await db.execute("DELETE from category where id=?", [id]);
        res.redirect("/admin/category?action=delete");
    }
    catch(err){
        console.log(err);
    }
});

router.get('/category/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            return res.render('admin/category/category-edit', {
                category: category,
                action: req.query.action
            });
        }
    }
    catch (err) {
        console.log(err);
    }

});

router.post('/category/edit/:id', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    try {
        const category = await Category.findByPk(id);
        if(category){
            category.name = name;
            category.save();
            return res.redirect("/admin/category?action=edit");
        }
        res.redirect("/admin/category");
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/category/create', async (req, res) => {
    try {
        res.render('admin/category/category-create', {
            title: "Blog-Creat",
            action: req.query.action
        });
    }
    catch (err) {
        console.log(err)
    }

});

router.post('/category/create', async (req, res) => {
    const name = req.body.name

    try {
        await Category.create({name: name});
        res.redirect("/admin/category?action=create");
    }
    catch (err) {
        console.log(err);
    }

});

router.get("/category", async (req,res) =>{
     const categories = await Category.findAll();
    console.log(categories);
    res.render("admin/category/category-list",{
        categories:categories,
        action: req.query.action
    });
});

module.exports = router;