const express = require("express");
const router = express.Router();
const path = require('path');
const userInfo = require(__dirname + '../../middleware/private_user_info');
const fs = require('fs');

//Sends either selected file, or sends names of files in users directory.
router.post('/', (req, res) => {
    userInfo(req.session.username).then((user) => {
        if(req.session.isAuth) {
            if (req.body.getAll) {
                fs.readdir(__dirname + `../../files/${user.Username}`, (err, files) => {
                    if (err) {
                        throw err;
                    }
                    res.send(files);
                });
            } else {
                res.sendFile(path.join(__dirname + `../../files/${user.Username}/${req.body.fileName}`));
            }
        } else {
            res.send("Access denied...");
        }
    });
});

module.exports = router;