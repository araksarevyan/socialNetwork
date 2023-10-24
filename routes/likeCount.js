const express = require('express');
const fs = require('fs');

const router = express.Router();


router.post('/admin/postsAddLike/:postId', (req, res, next) => {
	let id = req.params.id;
	let editData = readJsonFile('info.json');
		for (let obj of editData) {
			if (obj.id == id) {
				obj.clickCount = +obj.clickCount + 1;
			}
		}
		writeJsonFile('info.json', editData);
	res.redirect('/');  
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

module.exports = router;
