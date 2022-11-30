const {DataTypes} = require('sequelize');
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull:false
    },
    img: {
        type: DataTypes.STRING,
        allowNull:false
    },
    chek: {
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    home: {
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

const Category = sequelize.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }   
}, {timeStamps: true});




Category.hasMany(Blog, { onDelete: "cascade" });
Blog.belongsTo(Category);

module.exports = {
    Blog,
    Category,
    User
};