const express = require("express");
const router = express.Router();

router.get('/blogs', (req,res) => {
    res.render('user/blogs')
});

router.get('/', (req,res) => {
    res.render('user/index')
});



module.exports = router;