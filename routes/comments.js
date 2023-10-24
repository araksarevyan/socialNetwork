const express = require('express');
const fs = require('fs');

const router = express.Router();

let commentsArr = [];

router.post('/admin/deleteComment/:postId/:commentId', function (req, res, next) {
	let postId = req.params.postId;
	let commentId = req.params.commentId;
	let updatedComment = readJsonFile('comments.json');
		for (let i of updatedComment) {
			if (i.postId == postId) {
				updatedComment = updatedComment.filter(
					com => com.commentId != commentId
				);
				writeJsonFile('comments.json', updatedComment);
			}
		}
	res.redirect('/');
});


router.post('/admin/editComment/:postId/:commentId', (req, res, next) => {
	let postId = req.params.postId;
	let commentId = req.params.commentId;
	let fileData = readJsonFile('comments.json') 
		for (let post of fileData) {
			if (post.postId == postId) {
				if (post.commentId == commentId) {
					post.text = req.body.inputValue
					break;
				}
			}
		}
		writeJsonFile('comments.json', fileData);
	res.redirect('/');
});


router.post('/admin/postsWriteComment/:postId', (req, res, next) => {
	let postId = req.params.postId;
	let commentId = getRandomInt();
	let commentsArr = readJsonFile('comments.json');
		commentsArr.push({
			postId: postId,
			commentId: commentId,
			text: req.body.writeComment
		})
		writeJsonFile('comments.json', commentsArr);
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

function getRandomInt(min, max) {
	min = Math.ceil(10);
	max = Math.floor(10000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
