var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let token=require('./routes/token');
var bodyParser = require("body-parser");
var expresssession=require("express-session")
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 解决跨域问题
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   // res.header("Access-Control-Allow-Headers", 'Content-Type');
//   res.header("Access-Control-Allow-Methods","POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json");
//   next();
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// 解决跨域问题,以及携带cookie问题
app.use(require('cors')({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(expresssession(
  {secret:"123456",
    name:"testapp",
    cookie:{maxAge: 60*1000*24},
    resave:true,
    saveUninitialized:false,
    // store:new expressmysqlseeion(options),
  }
))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 处理用户管理
app.use('/users', usersRouter);
//处理代币路径
app.use('/token',token)
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
