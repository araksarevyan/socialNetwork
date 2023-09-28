const express = require('express');
const fs = require('fs');

const router = express.Router();


router.get('/admin/signIn', (req, res, next) => {
	res.render('signInPage');
});


router.post('/admin/signIn', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	fs.readFile('loginData.json', function (err, fileContent) {
		if (!err) {
			let data = JSON.parse(fileContent);
			for (let i in data) {
				if (email === data[i].email && password === data[i].password) {
					console.log(data[i].userId);
					res.redirect('/');
					break;
				} else {
					res.redirect('/admin/signIn');
					break;
				}
			}
		}
	});
	
});


module.exports = router;