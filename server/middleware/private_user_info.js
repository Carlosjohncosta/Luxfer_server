const sql = require("mssql");
const config = require(__dirname + '/dbConfig');


module.exports = async function (username){
    sql.connect(config, (err)=> {
        if (err) throw(err);
    });
    return userPromise = new Promise((resolve, reject) => {
        sql.query("SELECT * FROM dbo.User_Info WHERE Username = '" + username + "'", (err, result) => {
           resolve(result.recordset[0]); 
        });
    });
}

