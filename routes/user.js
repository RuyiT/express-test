var express = require('express');
var router = express.Router(); // 引入路由
const { login } = require('../controllor/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});

router.post('/test', function(req, res, next) {
    const {username, password} = req.body 
    res.json({
        username,
        password
    })
});

router.post('/login-test', function(req, res, next) {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: '已登陆'
        })
        return
    }
    res.json({
        errno: -1,
        msg: '未登陆'
    })
});

router.get('/session-test', function(req, res, next) {
    const session = req.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum++

    res.json({
        viewNum: session.viewNum
    })
});

module.exports = router;
