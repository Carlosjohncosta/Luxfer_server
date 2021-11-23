const express = require("express");
const router = express.Router();
const dbconnect = require("./dbconnect");
const mysql = require("mysql");
const bcrypt = require('bcrypt');

router.post('/', function(request, response) {
	const con = dbconnect();
	console.log("here");
	const username = request.body.username;
	const password = request.body.password;
	if (username && password) {
		con.query('SELECT Password FROM login WHERE Username = ?', [username], function(error, results, fields) {
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
		});
	} 
});


module.exports = router;