const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

router.post('/', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = `${__dirname}../../../Risk Assessments/${files.filetoupload.originalFilename}`;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.redirect('File uploaded and moved!');
          res.end();
        });
    });
});

module.exports = router;
    