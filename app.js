const express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
	bluebird = require('bluebird'),
	bodyParser = require('body-parser'),
	moment = require('moment'),
	routes = require('./routes/index'),
	app = express(),
	port = process.env.PORT || 8000,
	uri = 'mongodb://localhost:27017/goods';

//连接数据库
mongoose.Promise = global.Promise;
const options = { promiseLibrary: bluebird};
var db = mongoose.createConnection(uri, options);


mongoose.connect(uri);
mongoose.connection.on('connected', function () {
	console.log('\tDatabase Connection success!');
});

app.locals.moment = moment;
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

routes(app);
app.listen(port, () => {
 	console.log('\tServer start on port:' + port);
});



// 	cookieParser = require('cookie-parser'),
// 	session = require('express-session'),
// 	mongoStore = require('connect-mongo')(session),

// 	morgan = require('morgan'),
// 	multiparty = require('connect-multiparty'),
// 	//logger = morgan('combined'),
// 	fs = require('fs'),
// 	models_path,
// 	walk


// //models loading
// models_path = __dirname + '/app/models'
// walk = function (path) {
// 	fs
// 		.readdirSync(path)
// 		.forEach(function (file) {
// 			var newPath = path + '/' + file,
// 				stat = fs.statSync(newPath);

// 			if (stat.isFile()) {
// 				if (/(.*)\.(js|coffee)/.test(file)) {
// 					require(newPath)
// 				}
// 			} else if (stat.isDirectory()) {
// 				walk(newPath)
// 			}
// 		})
// }
// walk(models_path)



// app.use(cookieParser())
// app.use(session({
// 	secret: 'imooc',
// 	resave: true,
// 	saveUninitialized: true,
// 	store: new mongoStore({
// 		url: dbUrl,
// 		options: 'sessions'
// 	})
// }));
// app.use(multiparty())
// var env = process.env.NODE_ENV || 'dev'
// if ('development' === env) {
// 	app.set('showStackError', true);
// 	app.use(morgan(':method :url :status'));
// 	app.locals.pretty = true;
// 	mongoose.set('debug', true);
// } 
