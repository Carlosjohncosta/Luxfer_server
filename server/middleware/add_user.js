const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {v4 : uuidv4} = require('uuid');
const config = require("./dbConfig");
const sql = require("mssql");
const saltRounds = 10;


router.post('/', (req, res)=>{
	sql.connect(config, (err)=> {
        sql.query('select * from User_Info', function (err, result) {
            
            if (err) throw(err)

            // send records as a response
            console.log(result.recordset);
        });
    });
    /*const con = dbconnect();
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        con.query("INSERT INTO accounts (ID, Username, Email, Password) VALUES (?, ?, ?, ?)", [uuidv4(), username, email, hash]);
    });*/
})

module.exports = router;