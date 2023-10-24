const express = require('express');
const fs = require('fs');

const router = express.Router();


router.get('/admin/login', (req, res, next) => {
	res.render('loginPage');
});

router.post('/admin/checkLogin', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let dudu = readJsonFile('signInData.json');
	for (let i in dudu) {
		if (email === dudu[i].email && password === dudu[i].password) {
			console.log(dudu[i].userId);
			return res.redirect('/');
		}
	}
	return res.redirect('/admin/login');
});

function readJsonFile(jsonFile) { 
	const data = fs.readFileSync(jsonFile,
		{ encoding: 'utf8', flag: 'r' });
	let parsedData = JSON.parse(data);
	return parsedData;
}

module.exports = router;