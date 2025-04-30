var express = require('express')
var router = express.Router()

// 获取列表（分页）
router.post('/GetPageList', function(req, res, next) {
    const pageIndex = req.body.pageIndex || 1;
    const pageSize = req.body.pageSize || 10;
    // 假设这里有一个函数用于从数据库中获取分页数据
    const data = {
        totalPages: 10,
        total: 100,
        rows: []
    };
    for (let i = 1; i <= 100; i++) {
        data.rows.push({
            id: i,
            name: `示例数据${i}`,
            address: "北京市海淀区",
            email: `zhangsan${i}@163.com`,
            phone: `1380013800${i}`,
            createTime: `2025-03-10 14:28:42`
        });
    }
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    const pageData = data.rows.slice(start, end);
    res.json({
        code: 200,
        message: "SUCCESS",
        data: {
            "pageIndex": pageIndex,
            "pageSize": pageSize,
            "totalPages": data.totalPages,
            "total": data.total,
            "rows": pageData
        },
        refreshToken: null,
        returnCode: "SUCCESS"
    });
})

module.exports = router