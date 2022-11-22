const express = require("express");
const router = express.Router();

const db = require("../data/db");
const config = require("../config");


router.use("/blogs/:id", async (req,res)=>{
    const id = req.params.id
    try{
        const [blog] = await db.execute("select * from blogs where id=?", [id]);
        if(blog[0]){
            return res.render("user/blog-detail",{
                title:"detail page",
                blog:blog[0]
            })
        }else{
            res.redirect("/");
        }
    }
    catch(err){
        console.log(err)
    }
})

router.use('/blogs', async (req,res) => {
    try{
        const[blogs, ] = await db.execute("select * from blogs where chek=1 or home=1");
        const[category, ] = await db.execute("select * from category");
        res.render("user/blogs", {
            title: "All News",
            blogs: blogs,
            category: category
        })
    }
    catch(err){
        console.log(err);
    }
});


 router.use('/', async (req,res) => {
    try{
        const[blogs] = await db.execute("select * from blogs");
        const[categories] = await db.execute("Select * from category");
        res.render("user/index",{
            title:"Home Page",
            blogs: blogs,
            categories: categories
        })
     }
    catch(err){
        console.log(err);
    }
 })






module.exports = router;