const mysql = require("mysql");
let connected = false;
const dbconnect = () => {
    var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Wolfie3141.',
        database : 'nodelogin'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log(`Connected to database`);
        connected = true;
    });
    return con;
}

module.exports = dbconnect;