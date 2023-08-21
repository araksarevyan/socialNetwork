const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require("fs");
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.set('view engine', 'ejs')


let arr = [];
app.post('/admin/delete-product/:id', function (req, res, next) {
	let id = req.params.id;
	fs.readFile("info.json", (err, fileContent) => {
		if (err) {
			return;
		}
		let updatedCart = JSON.parse(fileContent);
		updatedCart = updatedCart.filter(
			prod => prod.id !== id
		);
		fs.writeFile("info.json", JSON.stringify(updatedCart), err => {
			console.log(err);
		});
	});
	res.redirect('/');
});


app.get('/admin/edit-product/:id', (req, res, next) => {
	let id = req.params.id;
	fs.readFile(__dirname + '/info.json', 'utf8', function (err, data) {
		if (err) {
			return err;
		}
		let editData = JSON.parse(data);
		let objToEdit = {};
		for (let obj of editData) {
			if (obj.id == id)
				objToEdit = obj;
		}
		res.render('edit', {
			data: objToEdit
		});
	});
});


app.post('/admin/edit-product/:id', (req, res, next) => {
	let id = req.params.id;
	fs.readFile(__dirname + '/info.json', 'utf8', function (err, data) {
		if (err) {
			return err;
		}
		let editData = JSON.parse(data);

		for (let obj of editData) {
			if (obj.id == id) {
				obj.title = req.body.title;	
			}
		}
		fs.writeFile("info.json", JSON.stringify(editData), function () { });
	});
	res.redirect('/');
});


app.get('/', (req, res, next) => {
	fs.readFile(__dirname + '/info.json', "utf8", function (err, data) {
		if (err) {
			return console.error(err);
		}
		let resData = JSON.parse(data);
		res.render('test', {
			resData: resData
		});
	})
});

app.post('/admin/add-product', (req, res, next) => {
	const title = req.body.title;
	const id = getRandomInt().toString();
	obj = {
		title: title,
		id: id
	};
	fs.readFile(__dirname + '/info.json', function (err, fileContent) {
		if (!err) {
			arr = JSON.parse(fileContent);
			arr.push(obj);
			fs.writeFile("info.json", JSON.stringify(arr), function () { });
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
