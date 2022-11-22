const express = require('express');
const app = express();
const port = 3000;


const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use(express.static('public'));
app.set('view engine', 'ejs');



app.use(userRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
    console.log(`server listing on port ${port}`)
})