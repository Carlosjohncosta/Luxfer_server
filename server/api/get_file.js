const express = require("express");
const router = express.Router();
const path = require('path');
const userInfo = require(__dirname + '../../middleware/private_user_info')
const session = require("express-session");

router.post('/', (req, res) => {
    userInfo(req.session.username).then((user) => {
        if(req.session.isAuth) {
            res.sendFile(path.join(__dirname + `../../files/${user.Username}/${req.body.fileName}`));
        } else {
            res.send("Access denied...");
        }
    });
})

module.exports = router;