const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('express-handlebars');
const db = require('node-mysql');
const DB = db.DB;
const BaseRow = db.Row;
const BaseTable = db.Table;

const routes = require('./src/routes/routes');
const app = express();

const index = require('./src/routes/index');
const api = require('./src/routes/api/api');
const bans = require('./src/routes/bans/bans');
const boards = require('./src/routes/boards/boards');
const users = require('./src/routes/users/users');
const port = 3000;

//Public folder
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/src/views/layout/'} ));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

//uncomment after you've found a favicon and placed it in your /public folder.
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('./src/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));


app.use('/', index);
app.use(routes);

//catch 404 pages
app.use(function(request, response, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})

const server = app.listen(port, () => {
  console.log('Listening on port ' + port + '.');
});