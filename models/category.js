const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

async function sync() {
    await Category.sync({ alter: true });
    console.log("Category table join")
}

sync();

module.exports = Category;