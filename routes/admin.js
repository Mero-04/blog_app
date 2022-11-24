const express = require('express')
const router = express.Router();

const db = require("../data/db");
const config = require("../config");


router.get('/delete/:id', async (req,res)=>{
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
})

router.post('/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        await db.execute("delete from blogs where id=?", [id]);
        res.redirect("/admin/blog-lists");
    }
    catch(err){
        console.log(err);
    }
})

router.get('/blog-lists/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [blogs,] = await db.execute("select * from blogs where id=?", [id]);
        const [categories,] = await db.execute("select * from category");
        const blog = blogs[0];
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

})

router.post('/blog-lists/:id', async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const text = req.body.text;
    const img = req.body.img;
    const chek = req.body.chek == "on" ? 1 : 0;
    const home = req.body.home == "on" ? 1 : 0;
    const category_id = req.body.category_id;

    try {
        await db.execute("UPDATE blogs SET title=?, text=?, img=?,  chek=?, home=?, category_id=? WHERE id=?", [title, text, img, chek, home, category_id, id]);
        res.redirect("/admin/blog-lists");
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/blog-create', async (req, res) => {
    try {
        const [categories,] = await db.execute("select * from category");
        res.render('admin/blog-create', {
            title: "Blog-Creat",
            categories: categories
        });
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/blog-create', async (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const img = req.body.img;
    const category_id = req.body.category_id;
    const chek = req.body.chek == "on" ? 1 : 0;
    const home = req.body.home == "on" ? 1 : 0;

    try {
        await db.execute("INSERT INTO blogs(title,text,img,category_id,chek,home) VALUES (?,?,?,?,?,?)",
            [title, text, img, category_id, chek, home]);
        res.redirect("/admin/blog-lists");
    }
    catch (err) {
        console.log(err);
    }

})

router.get('/blog-lists', async (req, res) => {
    try {
        [blogs,] = await db.execute("Select * from blogs");
        res.render('admin/blog-list', {
            blogs: blogs
        });
    }
    catch (err) {
        console.log(err);
    }

})



module.exports = router;