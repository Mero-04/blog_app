const {DataTypes} = require('sequelize');
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
});

async function sync() {
    await Blog.sync({alter: true});
    console.log("blog table join")
}

sync();

module.exports = Blog;