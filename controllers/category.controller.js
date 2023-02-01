
const { Blog, Category } = require("../models/model");
const db = require("../data/db");
const config = require("../config");



exports.get_category_delete = async (req,res) =>{
    const id = req.params.id;
    try{
        const categories = await Category.findByPk(id);
        if(categories){
            res.render("admin/category/category-delete",{
                categories:categories,
                action:req.query.action
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.post_category_delete = async (req,res) => {
    const id = req.params.id;    
    try{
        const categories = await Category.findByPk(id);
        if(categories){
            await categories.destroy();
            res.redirect("/admin/category?action=delete");
        }
        
    }
    catch(err){
        console.log(err);
    }
}

exports.get_category_edit = async (req, res) => {
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
}

exports.post_category_edit = async (req, res) => {
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
}

exports.get_category_create = async (req, res) => {
    try {
        res.render('admin/category/category-create', {
            title: "Blog-Creat",
            action: req.query.action
        });
    }
    catch (err) {
        console.log(err)
    }

}

exports.post_category_create = async (req, res) => {
    const name = req.body.name

    try {
        await Category.create({name: name});
        res.redirect("/admin/category?action=create");
    }
    catch (err) {
        console.log(err);
    }

}

exports.index = async (req,res) =>{
    const categories = await Category.findAll();
   console.log(categories);
   res.render("admin/category/category-list",{
       categories:categories,
       action: req.query.action
   });
}