const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.send(`
    <ul>
        <div onmouseover="expand('.My_files')" onmouseout="collapse('.My_files')" class="no_style">
            <a href="/home" class="no_style"><li>My files</li></a>
            <li class="My_files">working</li>
            <li class="My_files">working</li>
            <li class="My_files">working</li>
            <li class="My_files">working</li>
            <li class="My_files">working</li>
        </div>
        <a href="/worksheets" class="no_style"><li class="no_style">Work Sheets</li></a>
        <a href="/" class="no_style"><li>Logout</li></a>
    </ul>
    `);
});

module.exports = router;