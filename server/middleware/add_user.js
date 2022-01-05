const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {v4 : uuidv4} = require('uuid');
const config = require("./dbConfig");
const sql = require("mssql");
const userInfo = require(__dirname + '../../middleware/private_user_info');
const fs = require('fs');
const saltRounds = 10;

router.post('/', (req, res)=>{
    //gets current user info and checks if user is logged in and if user is admin. Throws Acess denied if conditions are not met.
    //Using .then as userInfo returns promise.
    userInfo(req.session.username).then((user) => {
        if (user && user.isAdmin == true) {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;
            bcrypt.hash(password, saltRounds, function(err, hash) {
                sql.connect(config, (err)=> {
                    userInfo('*').then((user) => {
                        let exists = false;
                        user.forEach((curr)=>{
                            if(curr.Username == username || curr.Email == email) {
                                exists = true;
                            }
                        });
                        if (!exists) {
                            sql.query("INSERT INTO dbo.User_Info (ID, Username, Email, Password) VALUES ('"+ uuidv4() +"', '"+ username +"', '"+ email +"', '"+ hash +"')",
                            function (err, result) {
                                if (err) throw(err)

                                //creates file for new user.
                                const dir = (__dirname  + `../../files/${username}`);
                                if (!fs.existsSync(dir)) {
                                    fs.mkdirSync(dir);
                                    console.log(`Directory for user: "${username}" has been created.`);
                                } else {
                                    console.log(`Directory for user: "${username}" already exists.`);
                                }
                                res.send("User succesfully added")
                            });
                        } else {
                            res.send("Username or Email already exists...")
                        }
                    });
                });
            });
        } else {
            res.send("Acess denied...");
        }
    });
})

module.exports = router;
