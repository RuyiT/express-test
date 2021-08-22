var express = require('express');
var router = express.Router(); // 引入路由
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controllor/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}
// 路径前面一定要加“/”
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // if (req.query.isadmin) {
    //     // 管理员界面
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         // 未登录
    //         return loginCheckResult
    //     }
    //     // 强制查询自己的博客
    //     author = req.session.username
    // }

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/test', function(req, res, next) {
    // res.json 相当于返回了数据为json的数据，而且还设置了返回头“application/json”
    res.json({
        errno: 0,
        data: [1,2,3]
    })
});

module.exports = router;
