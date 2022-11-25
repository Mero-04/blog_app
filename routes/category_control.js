const express = require('express')
const router = express.Router();

const db = require("../data/db");
const config = require("../config");

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
        const [categories, ] = await db.execute("select * from category where id=?", [id]);
        const category = categories[0];
        if (category) {
            return res.render('admin/category/category-edit', {
                categories: categories[0],
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
        await db.execute("UPDATE category SET name=? WHERE id=?", [name, id]);
        res.redirect("/admin/category?action=edit");
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/category/create', async (req, res) => {
    try {
        const [categories,] = await db.execute("select * from category");
        res.render('admin/category/category-create', {
            title: "Blog-Creat",
            categories: categories,
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
        await db.execute("INSERT INTO category(name) VALUES (?)",
            [name]);
        res.redirect("/admin/category?action=create");
    }
    catch (err) {
        console.log(err);
    }

});

router.get("/category", async (req,res) =>{
    [categories, ] = await db.execute("select * from category");
    res.render("admin/category/category-list",{
        categories:categories,
        action: req.query.action
    });
});

module.exports = router;