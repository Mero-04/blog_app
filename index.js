const express = require('express');
const app = express();
const port = 3000;


const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const categoryRouter = require("./routes/category_control");



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));



app.use("/admin/", categoryRouter);
app.use("/admin", adminRoutes);
app.use(userRoutes);




app.listen(port, () => {
    console.log(`server listing on port ${port}`)
})