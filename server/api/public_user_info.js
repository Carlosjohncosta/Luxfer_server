const sql = require("mssql");
const config = require(__dirname + '../../middleware/dbConfig');
const express = require("express");
const router = express.Router();
const path = require('path');

//Gets public user info. Used as I don't want to send UUID or admin status
router.get('/', (req, res) => {
    sql.connect(config, (err)=> {
        if (err) throw(err);
    });

    //Checks if user is logged in (username will be undefined if there is no active session);
    if (!req.session.username) {
        res.send("Invalid session, please re-log in");
        return;
    }

    //No auth check is done as info sent is public.
    sql.query("SELECT * FROM dbo.User_Info WHERE Username = '" + req.session.username + "'", (err, result) => {
        res.json({
            username: result.recordset[0].Username,
            email: result.recordset[0].Email
        })
    });
});

module.exports = router;