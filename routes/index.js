var express = require('express');
var router = express.Router(); // 引入路由

/* GET home page. */
router.get('/', function(req, res, next) {
  // 这个render 会关联app.js前段的views和static相关的代码
  res.render('index', { title: 'Express' });
});

module.exports = router;
