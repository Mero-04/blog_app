const express = require('express')
const router = express.Router();

const db = require("../data/db");
const config = require("../config");


router.use('/blog-lists/:id', (req,res) =>{

    res.render('admin/blog-edit');
})

router.get('/blog-create', async (req,res) =>{
    try{
        const [categories, ] = await db.execute("select * from category");
        res.render('admin/blog-create',{
            title: "Blog-Creat",
            categories:categories
        });
    }
    catch(err){
        console.log(err)
    }
   
})

router.post('/blog-create', async (req,res) => {
    const title = req.body.title;
    const text = req.body.text;
    const img = req.body.img;
    const category_id = req.body.category_id;
    const chek = req.body.chek == "on" ? 1:0;
    const home = req.body.home == "on" ? 1:0;

    try{
        await db.execute("INSERT INTO blogs(title,text,img,category_id,chek,home) VALUES (?,?,?,?,?,?)",
        [title,text,img,category_id,chek,home]);
        res.redirect("/admin/blog-lists");
    }
    catch(err){
        console.log(err);
    }

}) 

router.get('/blog-lists', async (req,res) =>{
    try{
        [blogs, ] = await db.execute("Select * from blogs"); 
        res.render('admin/blog-list',{
            blogs:blogs
        });
    }
    catch(err){
        console.log(err);
    }
   
})



module.exports = router;