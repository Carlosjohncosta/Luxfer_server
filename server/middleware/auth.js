const express = require("express");
const router = express.Router();
const config = require("./dbConfig");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const session = require("express-session");


router.post('/', function(req, res) {

	//Gets password and username from request.
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {

		//Connects to databse using settings in config file.
		sql.connect(config, (err)=> {
			if (err) throw(err);

			//Queries the database for password associated with username.
			sql.query("SELECT Password FROM dbo.User_Info WHERE Username = '" + username + "'", function(err, results) {
				if (err) throw(err);

				//gets hashed password from results.
				var hash = results.recordset[0];

				//Checks if hash is defined; no username matching inputed username.
				if (hash) {
					bcrypt.compare(password, hash.Password, (err, result)=> {
						if (result) {
							//sets session headers.
							req.session.isAuth = true;
							req.session.username = username;
							console.log("redirecting");
							//sends response. Not using redirect as the site script re-directs;
							res.send("/home");
							return;
						} else {
							res.send("incorrect");
							return;
						}
					});	
				} else {
					res.send("incorrect");
				}		
			});
		})
	} else {
		res.send("invalid");
		return;
	}
});


module.exports = router;
