const sql = require("mssql");
const config = require(__dirname + '../../middleware/dbConfig');
const express = require("express");
const router = express.Router();
const path = require('path');
const { builtinModules } = require("module");

router.get('/', (req, res) => {
    sql.connect(config, (err)=> {
        if (err) throw(err);
    });
    if (!req.session.username) {
        res.send("An error has occured");
        return;
    }
    sql.query("SELECT * FROM dbo.User_Info WHERE Username = '" + req.session.username + "'", (err, result) => {
        res.json({
            username: result.recordset[0].Username,
            email: result.recordset[0].Email
        })
    });
});

module.exports =router;