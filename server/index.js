const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const mysql = require("mysql");
const session = require("express-session");
const dbconnect = require("./middleware/dbconnect");
const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//connects to database
dbconnect();


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use("/auth", require("./middleware/auth"));
app.use("/add_user", require("./middleware/add_user"));
//app.use(logger);


//static folder
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/:url', function(request, response) {
	response.sendFile(path.join(__dirname + `/public/${request.params.url}.html`));
});

//port seup
const PORT = process.env.PORT || 3001;

//request listener
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
