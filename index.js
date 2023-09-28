const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require('fs');
const bodyParser = require('body-parser');
const date = require('date-and-time');


const loginData = require('./routes/loginData');
const signInPage = require('./routes/signInPage');
const commentsRoutes = require('./routes/comments');
const likeCounter = require('./routes/likeCount');


app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(loginData);
app.use(signInPage);
app.use(commentsRoutes);
app.use(likeCounter);


let arr = [];


app.post('/admin/deleteUser/:postId', function (req, res, next) {
	let postId = req.params.postId;
	fs.readFile('info.json', (err, fileContent) => {
		if (err) {
			return;
		}
		let updatedCart = JSON.parse(fileContent);
		updatedCart = updatedCart.filter(
			prod => prod.postId !== postId
		);
		fs.writeFile('info.json', JSON.stringify(updatedCart), err => {
			console.log(err);
		});
	});
	res.redirect('/');
});


app.get('/admin/editUserData/:postId', (req, res, next) => {
	let postId = req.params.postId;
	fs.readFile('info.json', function (err, data) {
		if (err) {
			return err;
		}
		let editData = JSON.parse(data);
		let objToEdit = {};
		for (let obj of editData) {
			if (obj.postId == postId)
				objToEdit = obj;
		}
		res.render('edit', {
			data: objToEdit
		});
	});
});


app.post('/admin/editUserData/:postId', (req, res, next) => {
	let postId = req.params.postId;
	fs.readFile('info.json', function (err, data) {
		if (err) {
			return err;
		}
		let editData = JSON.parse(data);
		for (let obj of editData) {
			if (obj.postId === postId) {
				obj.firstName = req.body.firstName;
				obj.lastName = req.body.lastName;
				obj.imageUrl = req.body.imageUrl;
				obj.postArea = req.body.postArea;
			}
		}
		fs.writeFile('info.json', JSON.stringify(editData), function () { });
	});
	res.redirect('/');
});


app.post('/admin/addNewUser', (req, res, next) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const imageUrl = req.body.imageUrl;
	const postArea = req.body.postArea;
	const value = date.format((new Date()), 'YYYY/MM/DD').toString();
	const postId = getRandomInt().toString();
	const comments = [];
	obj = {
		firstName: firstName,
		lastName: lastName,
		imageUrl: imageUrl,
		postArea: postArea,
		value: value,
		postId: postId,
		comments: comments

	};
	fs.readFile('info.json', function (err, fileContent) {
		if (!err) {
			arr = JSON.parse(fileContent);
			arr.push(obj);
			fs.writeFile('info.json', JSON.stringify(arr), function () { });
		}
	});
	res.redirect('/');
});


app.get('/', (req, res, next) => {
	fs.readFile('info.json', function (err, fileContent) {
		let allPosts = JSON.parse(fileContent);
		fs.readFile('comments.json', 'utf8', function (err, data) {
			if (!err) {
				let comments = JSON.parse(data);
				res.render('test', {
					allPosts: allPosts,
					comments: comments
				});
			}
		});
	});
});


function getRandomInt(min, max) {
	min = Math.ceil(10);
	max = Math.floor(10000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


server.listen(3007, () => {
	console.log('listening on localhost:3007');
});
