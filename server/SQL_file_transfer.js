const reader = require('xlsx');
const sql = require('mssql');
const config = require(__dirname + '/middleware/dbConfig.js');
const converter = require("csvtojson");
const prompt = require("prompt-sync")();

//DB query. Only works for .csv files atm.
const file = prompt("Location of file: ");
const query = prompt("SQL query: ")
prompt("Press enter to execute query...");
converter().fromFile(file).then(file => {
    sql.connect(config, (err)=> {
        if (err) throw(err);
        file.forEach(row => {
            sql.query(query, (err, res) =>{
                if (err) {
                    console.log(res);
                    throw err;
                } else {
                    console.log(`performing query ${query}: ${row}`);
                }
            });
        });
    });
});
