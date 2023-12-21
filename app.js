const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Import routes for "catalog" area of site
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog");
//Set up mongoose connection
const mongoose = require("mongoose");
const process = require('dotenv').config();
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.parsed.user}:${process.parsed.password}@cluster0.rweikj4.mongodb.net/`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter); //Add catalog routes to middleware chain.
//app.use('/users', indexRouter);git
//app.use('/', usersRouter);
//app.use('/cool', usersRouter);
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
