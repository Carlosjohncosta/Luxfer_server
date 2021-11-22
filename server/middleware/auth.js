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
		con.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				console.log("redirecting");
				response.send("/home");
			} else {
				response.send('incorrect');
			}			
			response.end();
		});
	} else {
		response.send('invalid');
		response.end();
	}
});


module.exports = router;