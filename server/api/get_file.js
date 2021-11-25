const express = require("express");
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
    res.sendFile(path.join(__dirname + `../../files/${req.body.fileName}`));
})

module.exports = router;