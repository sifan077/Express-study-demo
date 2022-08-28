const express = require('express');
const router = express.Router();

// users页，测试中间件使用
router.get('/', function (req, res, next) {
    res.send('<h1>Users</h1>');
});
// 中间件使用案例
router.get('/req', ((req, res, next) => {
    res.send("<h1>/users/req中间件的使用</h1>");
}));
// 中间件判断登录案例
router.get('/login', (req, res) => {
    res.send("您已经登陆，可以正常访问当前页面");
})

module.exports = router;
