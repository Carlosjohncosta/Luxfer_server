const sql = require("mssql");
const config = require(__dirname + '../../middleware/dbConfig');
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    sql.connect(config, err => {
        if(err) throw(err);
    });
    if (req.session.isAuth) {
        //Selects collumn names and data.
        sql.query(`EXEC SP_COLUMNS ${req.body.table}; select * from ${req.body.table}`, (err, result) => {

            //Sends formated HTML table, iterating through each result.
            let output = `<table><tr>`;

            //Table headers.
            result.recordsets[0].forEach(header => {
                output += `<th>${header.COLUMN_NAME}</th>`;
            });
            output += `</tr>`;

            //Table data.
            result.recordsets[1].forEach(data => {
                output += `<tr>`;
                for (let rowItem in data) {
                    output += `<td>${data[rowItem]}</td>`;
                }
                output += `</tr>`;
            });

            output == `</table>`
            res.send(output);
        });
        return;
    } else {
        res.send("Access denied...");
        return;
    }
});

module.exports = router;