const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {v4 : uuidv4} = require('uuid');
const config = require("./dbConfig");
const sql = require("mssql");
const userInfo = require(__dirname + '../../middleware/user_info')
const saltRounds = 10;

//pretty self explanitory, gets user input and inserts into database. Saves hashed password.
router.post('/', (req, res)=>{
    userInfo(req.session.username).then((user) => {
        if (user.isAdmin == true) {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;
            bcrypt.hash(password, saltRounds, function(err, hash) {
                sql.connect(config, (err)=> {
                    sql.query("INSERT INTO dbo.User_Info (ID, Username, Email, Password) VALUES ('"+ uuidv4() +"', '"+ username +"', '"+ email +"', '"+ hash +"')",
                    function (err, result) {
                        if (err) throw(err)
                        res.send("User succesfully added")
                    });
                });
            });
        } else {
            res.send("Acess denied...");
        }
    });
})

module.exports = router;