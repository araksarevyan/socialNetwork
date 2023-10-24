const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const signInData = require('./routes/signInData');
const loginData = require('./routes/loginData');
const commentsRoutes = require('./routes/comments');
const likeCounter = require('./routes/likeCount');

const userControllers = require('./controllers/user');

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(signInData);
app.use(loginData);
app.use(commentsRoutes);
app.use(likeCounter);


app.post('/admin/deleteUser/:postId', userControllers.postDeleteUser);

app.get('/admin/editUserData/:postId', userControllers.getEditUserData);

app.post('/admin/editUserData/:postId', userControllers.postEditUserData);

app.post('/admin/addNewUser', userControllers.postAddNewUser);

app.get('/', userControllers.getPage);


server.listen(3007, () => {
	console.log('listening on localhost:3007');
});
