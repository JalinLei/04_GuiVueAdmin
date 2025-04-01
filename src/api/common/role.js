/**********************************
 * @Desc: 角色管理
 * @Author:  Jalin
 **********************************/

import service from '@/utils/common/request'

// 获取角色列表（分页查询）
export const Api_Common_Role_GetRoleList = (data) => {
    /*return service({
        url: '/Role/PageList',
        method: 'post',
        data
    })*/

    return new Promise((resolve, reject) => {
        resolve({
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
        })
    })
}

// 获取菜单列表
export const Api_Common_Role_GetMenuList = () => {
    return service({
        url: '/Role/GetMenuList',
        method: 'get'
    })
}

// 新增角色
export const Api_Common_Role_Add = (data) => {
    return service({
        url: '/Role/Add',
        method: 'post',
        data
    })
}

// 更新角色
export const Api_Common_Role_Update = (data) => {
    return service({
        url: '/Role/Update',
        method: 'post',
        data
    })
}

// 获取菜单列表
export const Api_Common_Role_Delete = (data) => {
    return service({
        url: '/Role/Delete',
        method: 'post',
        data
    })
}
