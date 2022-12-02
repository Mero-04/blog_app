const express = require("express");
const { User } = require("../models/model");
const bcrypt = require('bcrypt');



exports.get_logout = async (req, res) => {
    try {
        await req.session.destroy();
        return res.redirect("/account/login");
    }
    catch (err) {
        console.log(err);
    }
}

exports.get_register = async (req, res) => {
    try {
        res.render("auth/register");
    }
    catch (err) {
        console.log(err);
    }
}

exports.post_register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOne({ where: { email: email } });
        if(user){
            req.session.message = "email has been used:)"
            return res.redirect("login")
        }
        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.redirect("login");
    }
    catch (err) {
        console.log(err);
    }
}


exports.get_login = async (req, res) => {
    const message = req.session.message;
    try {
        res.render("auth/login",{
            message:message
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.post_login = async (req, res) => {
    const email = req.body.name;
    const password = req.body.password;

    try {
        const user = await User.findOne({
            where: email
        });

        if (!user) {
            return res.render("auth/login", {
                message: "email invalid"
            })
        }

        const match = await bcrypt.compare(password, user.password)
        if (match) {
            req.session.isAuth = true;
            req.session.name = user.name;
            const url = req.query.returnUrl || "/";
            res.redirect(url);
        } else {
            return res.render("auth/login", {
                message: "password invalid"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}
