const express = require('express');
const fs = require('fs');

const router = express.Router();


router.post('/admin/postsAddLike/:id', (req, res, next) => {
	let id = req.params.id;
	fs.readFile('info.json', 'utf8', function (err, data) {
		if (err) {
			return err;
		}
		let editData = JSON.parse(data);
		for (let obj of editData) {
			if (obj.id == id) {
				obj.clickCount = +obj.clickCount + 1;

			}
		}
		fs.writeFile('info.json', JSON.stringify(editData), function () { });
	});
	res.redirect('/');
});


module.exports = router;
