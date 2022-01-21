const express = require("express");
const router = express.Router();
const path = require('path');

//Sends side-bar template.
router.get('/', (req, res) => {
    res.send(/*HTML*/
    `
    <ul>
        <a href="/home" class="no_style"><li>Home</li></a>
        <a href="/worksheets" class="no_style"><li>Work Sheets</li></a>
        <a href="/parts_list" class="no_style"><li>parts list</li></a>
        <a href="/" class="no_style"><li>Logout</li></a>
    </ul>
    `);
});

module.exports = router;