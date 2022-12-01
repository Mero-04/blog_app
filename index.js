//express
const express = require('express');
const app = express();

const port = 3000;

const cookieParser = require('cookie-parser');
const session = require('express-session');
//download etmeli db_sessionda durya npm i connect-session-sequelize
// const SequelizeStore = require('connect-session-sequelize')(session.store)

//routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const categoryRouter = require("./routes/category_control");
const authController = require("./routes/auth");
const sequelize = require('./data/db');

//view engine
app.set('view engine', 'ejs');
const isAuth = require("./middlewares/auth.middleware");
//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "hello world",
    resave: false,
    seveUninitialized: false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24 
    }
    // store:new SequelizeStore({
    //     db:sequelize
    // })
}));

app.use(function(req,res,next){
    res.locals.isAuth = req.session.isAuth;
    res.locals.name = req.session.name;
    next();
})

app.use("/admin/", isAuth, categoryRouter);
app.use("/admin", isAuth, adminRoutes);
app.use("/account", authController);
app.use(userRoutes);



//serv
app.listen(port, () => {
    console.log(`server listing on port ${port}`)
})