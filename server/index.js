const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const mssql = require("mssql");
const session = require("express-session");
const https = require("https");
const fs = require("fs");
const app = express();
const sql = require("mssql");

//body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//middleware loader
app.use("/auth", require("./middleware/auth"));
app.use("/add_user", require("./middleware/add_user"));
app.use(logger);


//static folder
app.use(express.static(path.join(__dirname, "public")));



//-------------------------ROUTES-----------------------------------//
app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/api/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/api/${request.params.file}`));
});

app.get('/scripts/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/scripts/${request.params.file}`));
});

app.get('/styles/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/styles/${request.params.file}`));
});

app.get('/:url', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/${request.params.url}.html`));
});

app.get('/files/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/files/${request.params.file}`));
});

app.get('/icons/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/icons/${request.params.file}`));
});
//-------------------------ROUTES-----------------------------------//




//port seup
const PORT = process.env.PORT || 3001;

//request listener
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

/*https.createServer({
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
  }, app)
  .listen(PORT, '10.2.0.141', function () {
	console.log(`Server running on port: ${PORT}.`);
  });*/
