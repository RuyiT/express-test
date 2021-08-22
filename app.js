var createError = require('http-errors');
var express = require('express');  // 引入 express
var path = require('path'); // 引入path
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session) // 引入的是一个函数，需要把上面的session放进去

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express(); // app实例

// view engine setup 视图引擎的设置 可以注释掉，前段页面的引用设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev')); // 注册logger日志插件，会自动记录日志，需要一些配置
app.use(express.json()); // 可以通过req.body获取数据，获取的是application/json格式的数据（post请求）
app.use(express.urlencoded({ extended: false })); // 可以通过req.body获取数据，获取的是x-www-form-urlencoded格式的数据（post请求）
// 解析cookie的插件, 有了这个插件，就可以，req.cookie访问到cookie
app.use(cookieParser()); // 注册cookieParser
// app.use(express.static(path.join(__dirname, 'public'))); //访问静态文件

const RedisStore = require('connect-redis')(session) // 引入的是一个函数，需要把上面的session放进去
const { redisClient } = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
// 解析完cookie以后解析session， 这样每次app请求的话就会有session的值了
app.use(session({
  secret: 'sdfhoisdhfoid', // 密匙，大小写特殊符号数字
  cookie: { // 识别cookie的一些配置
    path: '/', // 根路径，默认配置
    httpOnly: true, // 前端不能操作cookie的配置,默认配置
    maxAge: 24 * 60 * 60 * 1000,
    store: sessionStore // 把session存放到redis当中
  }
})); 


// 引入路由，注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
// createError 帮助检验处理 404的页面
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 程序出了问题返回给错误，dev是为本地的才返回
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
