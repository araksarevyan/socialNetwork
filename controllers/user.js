const fs = require('fs');
const date = require('date-and-time');

exports.postDeleteUser = (req, res, next) =>{
	let postId = req.params.postId;
	let updatedCart = readJsonFile('info.json');
	updatedCart = updatedCart.filter(
		prod => prod.postId !== postId
	);
	writeJsonFile('info.json', updatedCart);
	res.redirect('/');
};

exports.getEditUserData = (req, res, next) => {
	let postId = req.params.postId;
	let editData = readJsonFile('info.json');
	let objToEdit = {};
	for (let obj of editData) {
		if (obj.postId == postId)
			objToEdit = obj;
	}
	res.render('edit', {
		data: objToEdit
	});
};

exports.postEditUserData = (req, res, next) => {
	let postId = req.params.postId;
	let editData = readJsonFile('info.json');
	for (let obj of editData) {
		if (obj.postId === postId) {
			obj.firstName = req.body.firstName;
			obj.lastName = req.body.lastName;
			obj.imageUrl = req.body.imageUrl;
			obj.postArea = req.body.postArea;
		}
	}
	writeJsonFile('info.json', editData);
	res.redirect('/');
};

exports.postAddNewUser = (req, res, next) => {
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
	let arr = readJsonFile('info.json');
	arr.push(obj);
	writeJsonFile('info.json', arr);
	res.redirect('/');
};


exports.getPage = (req, res, next) => {
	let allPosts = readJsonFile('info.json')
	let comments = readJsonFile('comments.json');
	res.render('test', {
		allPosts: allPosts,
		comments: comments
	});
};


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