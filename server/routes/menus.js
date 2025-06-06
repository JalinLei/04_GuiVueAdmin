var express = require('express')
var router = express.Router()

/* GET menus listing. */
router.get('/', function (req, res, next) {
    res.send('菜单管理')
})

router.get('/GetMenuList', function (req, res, next) {
    res.json({
        "code": 200,
        "message": "SUCCESS",
        "refreshToken": null,
        "returnCode": "SUCCESS",
        "data": [
            {
                'id': 1,
                'CreatedAt': '2024-07-31T11:25:31.499+08:00',
                'UpdatedAt': '2024-07-31T11:25:31.499+08:00',
                'parentId': 0,
                'path': 'dashboard',
                'name': 'Dashboard',
                'hidden': false,
                'component': 'view/dashboard/index.vue',
                'sort': 1,
                'meta': {
                    'activeName': '',
                    'keepAlive': false,
                    'defaultMenu': false,
                    'title': '首页',
                    'icon': 'odometer',
                    'closeTab': false
                },
                'authoritys': null,
                'menuBtn': null,
                'menuId': 1,
                'children': null,
                'parameters': [],
                'btns': null
            },
            {
                "id": 2,
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
                        "id": 3,
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
                                "id": 4,
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
                        "id": 5,
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
                                "id": 6,
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
                ],
                'parameters': [],
                'btns': null
            },
            {
                "id": 3,
                "parentId": 0,
                "path": "component",
                "hidden": false,
                "name": "ComponentLayout",
                "component": "view/routerHolder.vue",
                "sort": 5,
                "meta": {
                    "keepAlive": false,
                    "title": "组件管理",
                    "icon": null,
                    "defaultMenu": false,
                    "activeName": ""
                },
                "children": [
                    {
                        "id": 40,
                        "parentId": 4,
                        "path": "steps",
                        "hidden": false,
                        "name": "ComponentPageSteps",
                        "component": "view/component/pageSteps.vue",
                        "sort": 1,
                        "meta": {
                            "keepAlive": false,
                            "title": "步骤条",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null,
                        'parameters': [],
                        'btns': null
                    },
                    {
                        "id": 41,
                        "parentId": 4,
                        "path": "table",
                        "hidden": false,
                        "name": "ComponentPageTable",
                        "component": "view/component/proTable.vue",
                        "sort": 2,
                        "meta": {
                            "keepAlive": false,
                            "title": "表格",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null,
                        'parameters': [],
                        'btns': null
                    },
                ],
                'parameters': [],
                'btns': null
            },
            {
                "id": 3,
                "parentId": 0,
                "path": "ep",
                "hidden": false,
                "name": "epLayout",
                "component": "view/routerHolder.vue",
                "sort": 3,
                "meta": {
                    "keepAlive": false,
                    "title": "ElementPlus组件",
                    "icon": null,
                    "defaultMenu": false,
                    "activeName": ""
                },
                "children": [
                    { value: 'button', label: '按钮' },

                    { value: 'tooltip', label: '文字提示' },
                    { value: 'divider', label: '分割线' },
                ].map((item, index) => ({
                    "id": 301 + index,  // 基准ID + 索引保持唯一性
                    "parentId": 3,
                    "path": item.value,  // 使用value作为路径
                    "hidden": false,
                    "name": `Ep${item.value.charAt(0).toUpperCase() + item.value.slice(1)}`,  // 基于value生成组件名
                    "component": `view/ep/${item.value}.vue`,
                    "sort": index + 1,
                    "meta": {
                        "activeName": "",
                        "keepAlive": false,
                        "defaultMenu": false,
                        "title": item.label,
                        "icon": "odometer",
                        "closeTab": false
                    },
                    "children": null,
                    'parameters': [],
                    'btns': null
                })),
                'parameters': [],
                'btns': null
            },
            {
                "id": 4,
                "parentId": 0,
                "path": "other",
                "hidden": false,
                "name": "OtherLayout",
                "component": "view/routerHolder.vue",
                "sort": 4,
                "meta": {
                    "keepAlive": false,
                    "title": "其他模块",
                    "icon": null,
                    "defaultMenu": false,
                    "activeName": ""
                },
                "children": [
                    {
                        "id": 41,
                        "parentId": 4,
                        "path": "tailwind",
                        "hidden": false,
                        "name": "OtherTailwind",
                        "component": "view/other/tailwind.vue",
                        "sort": 1,
                        "meta": {
                            "keepAlive": false,
                            "title": "Tailwind",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null,
                        'parameters': [],
                        'btns': null
                    },
                    {
                        "id": 42,
                        "parentId": 4,
                        "path": "icon",
                        "hidden": false,
                        "name": "OtherIcon",
                        "component": "view/other/icon.vue",
                        "sort": 2,
                        "meta": {
                            "keepAlive": false,
                            "title": "SVG图标",
                            "icon": null,
                            "defaultMenu": false
                        },
                        "children": null,
                        'parameters': [],
                        'btns': null
                    },
                ],
                'parameters': [],
                'btns': null
            },
            {
                "id": 10,
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
                    "defaultMenu": false,
                    "activeName": ""
                },
                "children": [
                    {
                        "id": 8,
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
                        "id": 9,
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
                        "id": 10,
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
                ],
                'parameters': [],
                'btns': null
            },
        ]
    });
})

module.exports = router
