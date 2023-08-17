const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require("fs");
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

app.post('/admin/delete-product/:id', function (req, res) {
	let id = req.params.id;
	console.log(id);
	fs.readFile("info.json", (err, fileContent) => {
		if (err) {
			return;
		}
		let updatedCart = JSON.parse(fileContent);
		console.log(updatedCart);
		updatedCart = updatedCart.filter(
			prod => prod.id !== id
		);
		console.log(updatedCart);
		fs.writeFile("info.json", JSON.stringify(updatedCart), err => {
			console.log(err);
		});
	});
	res.redirect('/');
});

app.get('/', (req, res, next) => {
	fs.readFile(__dirname + '/info.json', function (err, data) {
		if (err) {
			return console.error(err);
		}
		let resData = JSON.parse(data);
		console.log(resData);
		res.render('test', {
			resData: resData
		});
	})
});

app.post('/admin/add-product', (req, res, next) => {
	const title = req.body.title;
	const id = getRandomInt().toString();
	let arr = [];
	obj = {
		title: title,
		id: id
	};
	fs.readFile(__dirname + '/info.json', function (err, fileContent) {
		if (!err) {
			arr = JSON.parse(fileContent);
			arr.push(obj);
			fs.writeFile("info.json", JSON.stringify(arr), function () { });
			console.log(arr);
		}
	});
	res.redirect('/');
});

function getRandomInt(min, max) {
    min = Math.ceil(10);
    max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.listen(3006, () => {
	console.log('listening on localhost:3006');
});
