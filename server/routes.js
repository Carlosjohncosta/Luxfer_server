const express = require("express");
const path = require("path");
const router = express.Router();
const destroy = (req) => req.session.destroy();
const userInfo = require(__dirname + '/middleware/private_user_info');
const template = require(__dirname + '/public/templates/main_template');

router.use('/', express.static(path.join(__dirname, "public")));

router.get('/', (req, res) => {
	if (req.session.username) console.log(`${req.session.username} logged out.`);
	destroy(req);
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

router.get('/scripts/:file', (req, res) => {
	res.sendFile(path.join(__dirname + `/public/scripts/${req.params.file}`));
});

router.get('/styles/:file', (req, res) => {
	res.sendFile(path.join(__dirname + `/public/styles/${req.params.file}`));
});

//Used to limit acces to admin only functions.
router.get('/admin/:file', (req, res)=>{
    userInfo(req.session.username).then((user)=> {
        if (user) {
            if (user.isAdmin) {
                res.sendFile(__dirname + `/public/admin/${req.params.file}.html`)
            } else {
                res.send('Access denied...');
            }
        } else {
            res.send('Invalid session, please re-log in.')
        }
    })
});

router.get('/favicon.ico', (req, res) => res.status(204));

//Used for any URL after logged in
router.get('/:url', (req, res) => {
	if(req.session.isAuth) {
		res.send(template(req.params.url));
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
