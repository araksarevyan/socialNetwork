const express = require('express');
const fs = require('fs');

const router = express.Router();

let arr = [];
router.get('/admin/login', (req, res, next) => {
	res.render('loginpage');
});


router.post('/admin/login', (req, res, next) => {
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

		// fs.readFile('loginData.json', function (err, fileContent) {
		// 	if (!err) {
		// 		arr = JSON.parse(fileContent);
		// 		arr.push(obj);
		// 		fs.writeFile('loginData.json', JSON.stringify(arr), function () { });
		// 	}
		// });
		// res.redirect('/'); 


		let a = readJsonFile('loginData.json');
		console.log(a);
			// arr = data;
			// arr.push(obj);
			writeJsonFile('loginData.json', arr);
	} else {
		console.log("Password is Wrong");
	}

});


function readJsonFile(jsonFile) {
	fs.readFileSync(jsonFile, 'utf8', function (err, fileContent) {
		if (err) {
			console.log(err);
		}
		let data = JSON.parse(fileContent);
		console.log(data);
		return data;
	})
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