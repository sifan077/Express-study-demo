const express = require('express');
const router = express.Router();

// 关于页，用来测试各种请求
router.get('/', function (req, res, next) {
    res.send('<h1>about</h1>');
});
// 测试返回json数据
router.get('/json', (req, res) => {
    const t = {"name": "jack", "msg": "Hello"}
    res.send(t)
});
// get请求携带参数
router.get('/getParams', ((req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    res.send({"x": x, "y": y});
}));
// post请求携带参数
router.post('/postParams', ((req, res) => {
    const x = req.body.x;
    const y = req.body.y;
    console.log(x);
    console.log(y);
    res.send({"x": x, "y": y});
}));
// 获取路径参数
router.get('/:id/:name', ((req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    res.send({"id": id, "name": name});
}));
module.exports = router;
