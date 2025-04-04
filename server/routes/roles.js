var express = require('express')
var router = express.Router()

// 获取用户列表（分页）
router.post('/GetPageList', function(req, res, next) {
    res.json({
        "code": 200,
        "message": "SUCCESS",
        "data": {
            "pageIndex": 1,
            "pageSize": 10,
            "totalPages": 1,
            "total": 3,
            "rows": [
                {
                    "name": "管理员",
                    "state": 1,
                    "remark": "管理员",
                    "createTime": "2025-03-10 14:28:42",
                    "isSystem": false,
                    "menus": [
                        {
                            "id": 1,
                            "parentId": 0,
                            "name": "系统管理",
                            "component": "view/system/layout.vue",
                            "sort": 5,
                            "createTime": "2025-03-06 10:07:59",
                            "isHide": false,
                            "icon": null,
                            "path": "system",
                            "routeName": "SystemLayout",
                            "keepAlive": false
                        },
                        {
                            "id": 2,
                            "parentId": 1,
                            "name": "用户管理",
                            "component": "view/system/user.vue",
                            "sort": 1,
                            "createTime": "2025-03-06 10:07:59",
                            "isHide": false,
                            "icon": null,
                            "path": "user",
                            "routeName": "SystemUser",
                            "keepAlive": false
                        },
                        {
                            "id": 3,
                            "parentId": 1,
                            "name": "角色管理",
                            "component": "view/system/role.vue",
                            "sort": 2,
                            "createTime": "2025-03-06 10:07:59",
                            "isHide": false,
                            "icon": null,
                            "path": "role",
                            "routeName": "SystemRole",
                            "keepAlive": false
                        },
                        {
                            "id": 7,
                            "parentId": 0,
                            "name": "测试菜单",
                            "component": "view/task/layout.vue",
                            "sort": 2,
                            "createTime": "2025-03-06 11:18:20",
                            "isHide": false,
                            "icon": null,
                            "path": "task",
                            "routeName": "TaskLayout",
                            "keepAlive": false
                        },
                        {
                            "id": 8,
                            "parentId": 7,
                            "name": "测试子菜单1",
                            "component": "view/task/single/layout.vue",
                            "sort": 1,
                            "createTime": "2025-03-06 11:25:18",
                            "isHide": false,
                            "icon": null,
                            "path": "single",
                            "routeName": "taskSingleLayout",
                            "keepAlive": false
                        },
                        {
                            "id": 9,
                            "parentId": 7,
                            "name": "测试子菜单2",
                            "component": "view/task/periodic/layout.vue",
                            "sort": 2,
                            "createTime": "2025-03-06 11:25:18",
                            "isHide": false,
                            "icon": null,
                            "path": "periodic",
                            "routeName": "TaskPeriodicLayout",
                            "keepAlive": false
                        },
                        {
                            "id": 10,
                            "parentId": 0,
                            "name": "首页",
                            "component": "view/overview/index.vue",
                            "sort": 1,
                            "createTime": "2025-03-06 11:27:14",
                            "isHide": false,
                            "icon": null,
                            "path": "overview",
                            "routeName": "Overview",
                            "keepAlive": false
                        },
                        {
                            "id": 12,
                            "parentId": 1,
                            "name": "菜单管理",
                            "component": "view/system/menu.vue",
                            "sort": 3,
                            "createTime": "2025-03-08 16:19:24",
                            "isHide": false,
                            "icon": null,
                            "path": "menu",
                            "routeName": "SystemMenu",
                            "keepAlive": false
                        }
                    ],
                    "id": 2
                },
                {
                    "name": "普通用户",
                    "state": 1,
                    "remark": "普通用户",
                    "createTime": "2025-03-10 14:29:19",
                    "isSystem": false,
                    "menus": [],
                    "id": 3
                },
                {
                    "name": "普通用户2",
                    "state": 1,
                    "remark": "",
                    "createTime": "2025-03-10 16:38:46",
                    "isSystem": false,
                    "menus": [],
                    "id": 5
                }
            ]
        },
        "refreshToken": null,
        "returnCode": "SUCCESS"
    });
})

// 获取菜单
router.get('/GetMenuList', function(req, res, next) {
    res.json({
        "code": 200,
        "message": "SUCCESS",
        "data": [
            {
                "id": 10,
                "parentId": 0,
                "path": "dashboard",
                "hidden": false,
                "name": "Dashboard",
                "component": "view/dashboard/index.vue",
                "sort": 1,
                "meta": {
                    "keepAlive": false,
                    "title": "首页",
                    "icon": null,
                    "defaultMenu": false
                },
                "children": null
            },
            {
                "id": 7,
                "parentId": 0,
                "path": "task",
                "hidden": false,
                "name": "TaskLayout",
                "component": "view/task/layout.vue",
                "sort": 2,
                "meta": {
                    'activeName': '',
                    'keepAlive': false,
                    'defaultMenu': false,
                    'title': '测试菜单',
                    'icon': 'odometer',
                    'closeTab': false
                },
                "children": [
                    {
                        "id": 8,
                        "parentId": 7,
                        "path": "single",
                        "hidden": false,
                        "name": "TaskSingleLayout",
                        "component": "view/task/single/layout.vue",
                        "sort": 1,
                        "meta": {
                            'activeName': '',
                            'keepAlive': false,
                            'defaultMenu': false,
                            'title': '测试子菜单1',
                            'icon': 'odometer',
                            'closeTab': false
                        },
                        "redirect": "/task/single/home",
                        "children": [
                            {
                                "id": 8,
                                "parentId": 7,
                                "path": "home",
                                "hidden": false,
                                "name": "TaskSingleHome",
                                "component": "view/task/single/home.vue",
                                "sort": 1,
                                "meta": {
                                    'activeName': '',
                                    'keepAlive': false,
                                    'defaultMenu': false,
                                    'title': '测试孙菜单1',
                                    'icon': 'odometer',
                                    'closeTab': false
                                },
                                "children": null,
                            }
                        ],
                    },
                    {
                        "id": 9,
                        "parentId": 7,
                        "path": "periodic",
                        "hidden": false,
                        "name": "TaskPeriodicLayout",
                        "component": "view/task/periodic/layout.vue",
                        "sort": 2,
                        "meta": {
                            'activeName': '',
                            'keepAlive': false,
                            'defaultMenu': false,
                            'title': '测试子菜单2',
                            'icon': 'odometer',
                            'closeTab': false
                        },
                        "redirect": "/task/periodic/home",
                        "children": [
                            {
                                "id": 8,
                                "parentId": 7,
                                "path": "home",
                                "hidden": false,
                                "name": "TaskPeriodicHome",
                                "component": "view/task/periodic/home.vue",
                                "sort": 1,
                                "meta": {
                                    'activeName': '',
                                    'keepAlive': false,
                                    'defaultMenu': false,
                                    'title': '测试孙菜单1',
                                    'icon': 'odometer',
                                    'closeTab': false
                                },
                                "children": null,
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1,
                "parentId": 0,
                "path": "system",
                "hidden": false,
                "name": "SystemLayout",
                "component": "view/system/layout.vue",
                "sort": 5,
                "meta": {
                    "keepAlive": false,
                    "title": "系统管理",
                    "icon": null,
                    "defaultMenu": false
                },
                "children": [
                    {
                        "id": 2,
                        "parentId": 1,
                        "path": "user",
                        "hidden": false,
                        "name": "SystemUser",
                        "component": "view/system/user.vue",
                        "sort": 1,
                        "meta": {
                            "keepAlive": false,
                            "title": "用户管理",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null
                    },
                    {
                        "id": 3,
                        "parentId": 1,
                        "path": "role",
                        "hidden": false,
                        "name": "SystemRole",
                        "component": "view/system/role.vue",
                        "sort": 2,
                        "meta": {
                            "keepAlive": false,
                            "title": "角色管理",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null
                    },
                    {
                        "id": 12,
                        "parentId": 1,
                        "path": "menu",
                        "hidden": false,
                        "name": "SystemMenu",
                        "component": "view/system/menu.vue",
                        "sort": 3,
                        "meta": {
                            "keepAlive": false,
                            "title": "菜单管理",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null
                    }
                ]
            }
        ],
        "refreshToken": null,
        "returnCode": "SUCCESS"
    });
})

// 获取角色枚举
router.get('/GetRoleEnums', function(req, res, next) {
    res.json({
        "code": 200,
        "message": "SUCCESS",
        "data": [
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
            },
            {
                "name": "普通用户2",
                "state": 1,
                "remark": "",
                "createTime": "2025-03-10 16:38:46",
                "isSystem": false,
                "menus": null,
                "id": 5
            }
        ],
        "refreshToken": null,
        "returnCode": "SUCCESS"
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
