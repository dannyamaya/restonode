const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const engines = require('consolidate');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const session  = require('express-session');

const mongoStore = require('connect-mongo')(session);


//Configuration file
const config = require('./config/config.json');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//     secret: config.cookie_secret,
//     proxy: true,
//     resave: true,
//     saveUninitialized: true,
//     store: new mongoStore({
//         url: config.production.db,
//         collection : 'sessions'
//     })
// }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// -----------------------------------------------------------------
// Database
// -----------------------------------------------------------------
mongoose.Promise = global.Promise;

mongoose.connect(config.production.db, { useNewUrlParser: true }, function(err, res) {
    if(err) {
        console.log('DBMongo: ¡¡ ERROR !!' + err);
    } else {
        console.log('DBMongo: OK');
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
