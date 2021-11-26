const sql = require("mssql");
const config = require(__dirname + '/dbConfig');


module.exports = async function (username){
    sql.connect(config, (err)=> {
        if (err) throw(err);
    });
    //must be returned as a promise as sql query is asyncronous
    return userPromise = new Promise((resolve, reject) => {
        sql.query("SELECT * FROM dbo.User_Info WHERE Username = '" + username + "'", (err, result) => {
            try {
                resolve(result.recordset[0]); 
            } catch (err) {
                result = false;
                resolve(result);
            }
        });
    });
}

