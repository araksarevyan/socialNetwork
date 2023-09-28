const express = require('express');
const fs = require('fs');

const router = express.Router();

let commentsArr = [];

router.post('/admin/deleteComment/:postId/:commentId', function (req, res, next) {
	let postId = req.params.postId;
	let commentId = req.params.commentId;
	fs.readFile('comments.json', (err, data) => {
		if (err) {
			return;
		}
		let updatedComment = JSON.parse(data);
		for (let i of updatedComment) {
			if (i.postId == postId) {
				updatedComment = updatedComment.filter(
					com => com.commentId != commentId
				);
				fs.writeFile('comments.json', JSON.stringify(updatedComment), err => {
					console.log(err);
				});
			}
		}
	});
	res.redirect('/');
});


router.post('/admin/editComment/:postId/:commentId', (req, res, next) => {
	let postId = req.params.postId;
	let commentId = req.params.commentId;
	fs.readFile('comments.json', 'utf8', function (err, data) {
		if (err) {
			return err;
		}
		let fileData = JSON.parse(data);
		for (let post of fileData) {
			if (post.postId == postId) {
				if (post.commentId == commentId) {
					post.text = req.body.inputValue
					break;
				}
			}
		}
		fs.writeFile('comments.json', JSON.stringify(fileData), function () { });
	});
	res.redirect('/');
});


router.post('/admin/postsWriteComment/:postId', (req, res, next) => {
	let postId = req.params.postId;
	let commentId = getRandomInt();
	fs.readFile('comments.json', 'utf8', function (err, data) {
		commentsArr = JSON.parse(data);
		commentsArr.push({
			postId: postId,
			commentId: commentId,
			text: req.body.writeComment
		})
		fs.writeFile('comments.json', JSON.stringify(commentsArr), function () { });
	})
	res.redirect('/');
});


function getRandomInt(min, max) {
	min = Math.ceil(10);
	max = Math.floor(10000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
