const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require("fs");
const router = express.Router();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs')
// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/test.html');
// });

app.get('/', (req, res, next) => {
	fs.readFile(__dirname + '/info.json', function (err, data) {
		if (err) {
			return console.error(err);
		}
		let resData = JSON.parse(data);
		res.render('test', {
			resData: resData
		});
	})
});
app.get('/', (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, imageUrl, price, description);
	console.log(product);
	product.save();
	fs.writeFile("info.json", JSON.stringify(product), (err) => {
		if (err) {
			console.log(err);
		}
		else {

		}
	});
	res.redirect('/');
});

app.post('/admin/add-product', (req, res, next) => {
	const title = req.body.title;
	let arr = [];
	// console.log(title);
	fs.readFile(__dirname + '/info.json', function (err, fileContent) {
		if (!err) {
			arr = JSON.parse(fileContent);
		} else {
			arr.push(this);
			fs.writeFile("info.json", JSON.stringify(title), (err) => {
				if (err) {
					console.log(err);
				}
				else {
					console.log("bla");
				}
			});
		}



	});
});

// app.get('/about', function(req, res) {
// 	console.log("bla");
//   });

server.listen(3006, () => {
	console.log('listening on localhost:3006');
});
