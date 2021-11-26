const express = require("express");
const path = require("path");
const router = express.Router();

router.use('/', express.static(path.join(__dirname, "public")));

router.get('/', (request, response) => {
	console.log(`${request.session.username} logged out.`);
	request.session.destroy();
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

router.get('/scripts/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/scripts/${request.params.file}`));
});

router.get('/styles/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/public/styles/${request.params.file}`));
});

router.get('/:url', (request, response) => {
	if(request.session.isAuth) {
		response.sendFile(path.join(__dirname + `/public/${request.params.url}.html`));
	} else {
		response.redirect('/');
	}
});

router.get('/files/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/files/${request.params.file}`));
});

router.get('/icons/:file', (request, response) => {
	response.sendFile(path.join(__dirname + `/icons/${request.params.file}`));
});

module.exports = router;
