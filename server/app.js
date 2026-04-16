var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require('mongoose');
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classRouter = require('./routes/class');
const studentRouter = require('./routes/student');
const subjectRouter = require('./routes/subject');
const teacherRouter = require('./routes/teacher');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//http://localhost:3000/classes/
app.use('/class', classRouter);
app.use('/student', studentRouter);
app.use('/subject', subjectRouter);
app.use('/teacher', teacherRouter);

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
