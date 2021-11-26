const express = require("express");
const path = require("path");
const router = express.Router();
const destroy = (req) => req.session.destroy();


router.use('/', express.static(path.join(__dirname, "public")));

router.get('/', (req, res) => {
	console.log(`${req.session.username} logged out.`);
	destroy(req);
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

router.get('/scripts/:file', (req, res) => {
	res.sendFile(path.join(__dirname + `/public/scripts/${req.params.file}`));
});

router.get('/styles/:file', (req, res) => {
	res.sendFile(path.join(__dirname + `/public/styles/${req.params.file}`));
});

router.get('/:url', (req, res) => {
	if(req.session.isAuth) {
		res.sendFile(path.join(__dirname + `/public/${req.params.url}.html`));
	} else {
		res.redirect('/');
	}
});

router.get('/files/:file', (req, res) => {
	res.sendFile(path.join(__dirname + `/files/${req.params.file}`));
});

router.get('/icons/:file', (req, res) => {
	res.sendFile(path.join(__dirname + `/icons/${req.params.file}`));
});

module.exports = router;
