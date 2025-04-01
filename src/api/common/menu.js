/**********************************
 * @Desc: 菜单管理
 * @Author:  Jalin
 * @LastEditor: Jalin
 **********************************/

import service from '@/utils/common/request'

// 用户登录 获取动态路由
export const Api_Common_Menu_AsyncMenu = () => {
    /*return service({
        url: '/Role/GetMenuList',
        method: 'get'
    })*/

    return new Promise((resolve, reject) => {
        resolve({
            "code": 200,
            "message": "获取成功！",
            "refreshToken": null,
            "returnCode": "SUCCESS",
            'data': [
                {
                    'ID': 1,
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
                        "defaultMenu": false,
                        "activeName": ""
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
            ]
        })
    })
}

// 获取menu列表
export const Api_Common_Menu_GetList = (data) => {
    /*return service({
        url: '/Role/GetMenuList',
        method: 'get'
    })*/

    return new Promise((resolve, reject) => {
        resolve({
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
                        },
                        {
                            "id": 4,
                            "parentId": 1,
                            "path": "operlog",
                            "hidden": false,
                            "name": "SystemOperlog",
                            "component": "view/system/operlog.vue",
                            "sort": 4,
                            "meta": {
                                "keepAlive": false,
                                "title": "操作日志",
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
        })
    })
}

// 新增菜单
export const Api_Common_Menu_Add = (data) => {
    return service({
        url: '/Role/AddMenu',
        method: 'post',
        data
    })
}

export const Api_Common_Menu_Update = (data) => {
    return service({
        url: '/Role/UpdateMenue',
        method: 'post',
        data
    })
}
