const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var fs = require("fs");

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

// app.get('/about', function(req, res) {
// 	console.log("bla");
//   });

server.listen(3005, () => {
	console.log('listening on localhost:3005');
});
