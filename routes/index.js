const express = require('express');
const router = express.Router();

// 主页
router.get('/', function (req, res, next) {
    // 渲染jade引擎,views文件夹下的 index.jade 根据条件渲染
    res.render('index', {title: 'Express'});
});
module.exports = router;
