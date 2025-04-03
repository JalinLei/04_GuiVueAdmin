var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource')
})

// 登录
router.post('/Login', function(req, res, next) {
    res.json({
        code: 200,
        message: "SUCCESS",
        data: {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2dWUiLCJqdGkiOiJlYWU0NzBmNS1kNWRlLTRhMDAtOGI4My00ZDcwMTgxMTYxNWUiLCJuYmYiOjE3NDMzODg0NjYsImlhdCI6MTc0MzM4ODQ2NiwiZXhwIjoxNzQzMzk5MjY2LCJpc3MiOiJ6cGx1c0lzc3VlciIsImF1ZCI6InZ1ZUF1ZGllbmNlIiwiVXNlck5hbWUiOiJhZG1pbiIsIlVzZXJJZCI6MSwiSXNTeXN0ZW0iOnRydWV9.CXqblllVTHfqttRgrvFopzxuZtf0zBVrn0GWF68inKM=",
            user: {
                userName: "admin",
                state: 1,
                remark: "内置账号",
                createTime: "2025-03-07 15:36:29",
                isSystem: true,
                roles: null,
                id: 1
            },
            token_type: "Bearer"
        },
        refreshToken: null,
        returnCode: "SUCCESS"
    });
})

// 获取用户信息
router.get('/GetUserInfo', function(req, res, next) {
    res.json({
        "code": 200,
        "message": "SUCCESS",
        "refreshToken": null,
        "returnCode": "SUCCESS",
        "data": {
            "userInfo": {
                "ID": 1,
                "CreatedAt": "2024-07-31T11:25:31.643+08:00",
                "UpdatedAt": "2024-07-31T11:25:31.644+08:00",
                "uuid": "984cbcba-0e8f-4948-ad34-617aff8401fb",
                "userName": "admin",
                "nickName": "超级管理员",
                "headerImg": "https://qmplusimg.henrongyi.top/gva_header.jpg",
                "authorityId": 888,
                "authority": {
                    "CreatedAt": "2024-07-31T11:25:31.491+08:00",
                    "UpdatedAt": "2024-07-31T11:25:31.647+08:00",
                    "DeletedAt": null,
                    "authorityId": 888,
                    "authorityName": "普通用户",
                    "parentId": 0,
                    "dataAuthorityId": null,
                    "children": null,
                    "menus": null,
                    "defaultRouter": "dashboard"
                },
                "authorities": [],
                "phone": "13566668888",
                "email": "13566668888@163.com",
                "enable": 1,
                "originSetting": null
            }
        }
    });
})

// 获取用户列表（分页）
router.post('/GetPageList', function(req, res, next) {
    res.json({
        code: 200,
        message: "SUCCESS",
        data: {
            "pageIndex": 1,
            "pageSize": 10,
            "totalPages": 1,
            "total": 3,
            "rows": [
                {
                    "userName": "管理员",
                    "state": 1,
                    "remark": "",
                    "createTime": "2025-03-10 14:28:42",
                    "isSystem": false,
                    "menus": null,
                    "roles": [
                        {
                            "name": "管理员",
                            "state": 1,
                            "remark": "管理员",
                            "createTime": "2025-03-10 14:28:42",
                            "isSystem": false,
                            "menus": null,
                            "id": 2
                        },
                        {
                            "name": "普通用户",
                            "state": 1,
                            "remark": "普通用户",
                            "createTime": "2025-03-10 14:29:19",
                            "isSystem": false,
                            "menus": null,
                            "id": 3
                        }
                    ],
                    "id": 2
                },
                {
                    "userName": "普通用户1",
                    "state": 1,
                    "remark": "",
                    "createTime": "2025-03-10 14:29:19",
                    "isSystem": false,
                    "menus": null,
                    "roles": [
                        { "name": "普通用户", "id": 2 }
                    ],
                    "id": 3
                },
                {
                    "userName": "普通用户2",
                    "state": 1,
                    "remark": "",
                    "createTime": "2025-03-10 16:38:46",
                    "isSystem": false,
                    "menus": null,
                    "roles": [
                        { "name": "普通用户", "id": 2 }
                    ],
                    "id": 5
                }
            ]
        },
        refreshToken: null,
        returnCode: "SUCCESS"
    });
})

router.post('/Add', function(req, res, next) {
    res.json({
        code: 200,
        message: "新增成功！",
        data: {},
        refreshToken: null,
        returnCode: "SUCCESS"
    });
})
router.post('/Update', function(req, res, next) {
    res.json({
        code: 200,
        message: "更新成功！",
        data: {},
        refreshToken: null,
        returnCode: "SUCCESS"
    });
})
router.post('/Delete', function(req, res, next) {
    res.json({
        code: 200,
        message: "更新成功！",
        data: {},
        refreshToken: null,
        returnCode: "SUCCESS"
    });
})

module.exports = router
