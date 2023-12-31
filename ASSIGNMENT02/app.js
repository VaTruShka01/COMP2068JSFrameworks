var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trackersRouter = require('./routes/trackers');

//export libraries

var mongoose = require('mongoose')
var config = require('./config/globals');
const session  = require('express-session');
const passport = require('passport');

const User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: "fall2023jsFrameworks",
  resave: false,
  saveUninitialized: false
}
));

app.use(passport.initialize());
app.use(passport.session())

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trackers', trackersRouter);


//configure mongoose

mongoose
.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true}) //connect
.then((message) => {console.log("Connected Successfully!")})         //do after
.catch((err) => {console.log("ERROR WHILE CONNECTING " + err)})

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
