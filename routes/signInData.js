const express = require('express');
const fs = require('fs');

const router = express.Router();

let arr = [];
router.get('/admin/signIn', (req, res, next) => {
	res.render('signInPage');
});


router.post('/admin/signIn', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const repeatPassword = req.body.repeatPassword;
	const userId = getRandomInt().toString();
	if (password == repeatPassword) {
		obj = {
			email: email,
			password: password,
			userId: userId
		};
		let a = readJsonFile('signInData.json');
		arr = a;
		arr.push(obj);
		writeJsonFile('signInData.json', arr);
		res.redirect('/');
	} else {
		console.log("Password is Wrong");
	}
});


function readJsonFile(jsonFile) {
	const data = fs.readFileSync(jsonFile,
		{ encoding: 'utf8', flag: 'r' });
	let d = JSON.parse(data);
	return d;
}


function writeJsonFile(jsonFile, arrData) {
	fs.writeFile(jsonFile, JSON.stringify(arrData), function () { });
	return jsonFile;
}

function getRandomInt(min, max) {
	min = Math.ceil(10);
	max = Math.floor(10000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = router;