const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {v4 : uuidv4} = require('uuid');
const config = require("./dbConfig");
const sql = require("mssql");
const saltRounds = 10;


router.post('/', (req, res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        sql.connect(config, (err)=> {
            sql.query("INSERT INTO dbo.User_Info (ID, Username, Email, Password) VALUES ('"+ uuidv4() +"', '"+ username +"', '"+ email +"', '"+ hash +"')",
            function (err, result) {
                
                if (err) throw(err)
            });
        });
    });
})

module.exports = router;