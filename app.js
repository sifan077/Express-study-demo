const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about')

const app = express();

// 视图工程安装
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// 利用express映射静态资源
// 如果不只一个静态资源文件夹，可以多次使用此方法
// 会根据根据目录的添加顺序查找所需的文件
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public'))); //等价于上一行
// 直接访问文件夹加文件名即可访问

// 访问指定路由使用中间件,需要声明在路由之前声明中间件
// 中间件可以用来判断用户是否登陆，请求是否合法
app.use('/users/req', ((req, res, next) => {
    console.log("通过中间件访问users/req");
    // 使用next()才能返回相应
    next();
    console.log("中间件/user/req放行")
}));
// 一个简单的判断登陆的小案例
app.use('/users/login', ((req, res, next) => {
    // 判断是否登陆
    const isLogin = true;
    if (isLogin) {
        // 如果登陆则放行
        next();
    } else {
        // 如果未登录则返回错误信息
        res.send('您还没有登录，无法访问当前页面');
    }
}));
// 路由的使用
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);


// 捕获404年和错误处理程序
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误处理方法
app.use(function (err, req, res, next) {
    // 设置本地，尽在开发环境提供错误信息
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误jade页面
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
