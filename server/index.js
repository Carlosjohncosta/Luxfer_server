const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const session = require("express-session");
const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use(session({
    name:'session-id',
    secret:'dfasfi=-s9f3423kf#af42asga',
    saveUninitialized:false,
    resave:false,
}))


//middleware and apiloader
app.use("/auth", require("./middleware/auth"));
app.use("/add_user", require("./middleware/add_user"));
app.use("/get_file", require("./api/get_file"));
app.use("/public_user_info", require("./api/public_user_info"));
//app.use(logger);


//static folder
app.use('/', express.static(path.join(__dirname, "public")));
//-------------------------ROUTES-----------------------------------//
app.get('/', (request, response) => {
	console.log(`${request.session.username} logged out.`);
	request.session.destroy();
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/scripts/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/scripts/${request.params.file}`));
});

app.get('/styles/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/styles/${request.params.file}`));
});

app.get('/:url', (request, response) => {
	if(request.session.isAuth) {
		response.sendFile(path.join(__dirname + `/public/${request.params.url}.html`));
	} else {
		response.redirect('/');
	}
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

