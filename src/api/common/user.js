/**********************************
 * @Desc: 用户管理
 * @Author:  Jalin
 **********************************/

import service from '@/utils/common/request'

// 用户登录
export const Api_Common_User_Login = (data) => {
    /*return service({
        url: '/User/Login',
        method: 'post',
        data: data
    })*/

    return new Promise((resolve, reject) => {
        resolve(
            {
                "code": 200,
                "message": "SUCCESS",
                "data": {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2dWUiLCJqdGkiOiJlYWU0NzBmNS1kNWRlLTRhMDAtOGI4My00ZDcwMTgxMTYxNWUiLCJuYmYiOjE3NDMzODg0NjYsImlhdCI6MTc0MzM4ODQ2NiwiZXhwIjoxNzQzMzk5MjY2LCJpc3MiOiJ6cGx1c0lzc3VlciIsImF1ZCI6InZ1ZUF1ZGllbmNlIiwiVXNlck5hbWUiOiJhZG1pbiIsIlVzZXJJZCI6MSwiSXNTeXN0ZW0iOnRydWV9.CXqblllVTHfqttRgrvFopzxuZtf0zBVrn0GWF68inKM=",
                    "user": {
                        "userName": "admin",
                        "state": 1,
                        "remark": "内置账号",
                        "createTime": "2025-03-07 15:36:29",
                        "isSystem": true,
                        "roles": null,
                        "id": 1
                    },
                    "token_type": "Bearer"
                },
                "refreshToken": null,
                "returnCode": "SUCCESS"
            }
        )
    })
}

// 获取登录用户信息
export const Api_Common_User_GetUserInfo = () => {
    /*return service({
        url: '/user/getUserInfo',
        method: 'get'
    })*/

    return new Promise((resolve, reject) => {
        resolve({
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
        })
    })
}

// 获取登录用户信息
export const Api_Common_User_LoginOut = () => {
    return new Promise((resolve, reject) => {
        resolve({
            "code": 200,
            "message": "退出成功！",
            "refreshToken": null,
            "returnCode": "SUCCESS",
            "data": {}
        })
    })
}

// 删除用户信息
export const Api_Common_User_Delete = (data) => {
    return service({
        url: '/User/Delete',
        method: 'post',
        data
    })
}

// 编辑用户信息
export const Api_Common_User_Update = (data) => {
    return service({
        url: '/User/Update',
        method: 'post',
        data
    })
}

// 添加用户信息
export const Api_Common_User_Add = (data) => {
    return service({
        url: '/User/Add',
        method: 'post',
        data
    })
}

// 获取角色列表（不包含系统内置角色和禁用角色）
export const Api_Common_User_GetRoleList = () => {
    return service({
        url: '/Role/GetRoleList',
        method: 'get'
    })
}

// 分页获取用户列表
export const Api_Common_User_GetList = (data) => {
    /*return service({
        url: '/User/PageList',
        method: 'post',
        data: data
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
                        "menus": null,
                        "id": 2
                    },
                    {
                        "name": "普通用户1",
                        "state": 1,
                        "remark": "普通用户1",
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
                ]
            },
            "refreshToken": null,
            "returnCode": "SUCCESS"
        })
    })
}
