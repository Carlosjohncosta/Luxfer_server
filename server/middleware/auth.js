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
			if (err) throw(err);
			sql.query("SELECT Password FROM dbo.User_Info WHERE Username = '" + username + "'", function(err, results) {
				if (err) throw(err);
				var hash = results.recordset[0];
					bcrypt.compare(password, hash.Password, (err, result)=> {
						if (result) {
							console.log("redirecting");
							res.send("/home");
							return;
						} else {
							res.send("incorrect");
							return;
						}
					});			
			});

		})
	} else {
		res.send("invalid");
		return;
	}
});


module.exports = router;