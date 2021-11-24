const express = require("express");
const router = express.Router();
const config = require("./dbConfig");
const sql = require("mssql");
const bcrypt = require('bcrypt');

router.post('/', function(req, res) {

	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		sql.connect(config, (err)=> {
			if (err) {
				console.log(err);
				return;
			} else {
				console.log("working");
			}
		})



		/*con.query('SELECT Password FROM login WHERE Username = ?', [username], function(error, results, fields) {
			if (results.length > 0) {
				bcrypt.compare(password, results.password, (err, result)=> {
					if (result) {
						request.session.loggedin = true;
						request.session.username = username;
						console.log("redirecting");
						response.send("/home");
						return;
					} else {
						response.send("incorrect");
						return;
					}
				});
			} else {
				response.send("invalid");
				return;
			} 			
		});*/
	} 
});


module.exports = router;