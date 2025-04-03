/**********************************
 * @Desc: 用户管理
 * @Author:  Jalin
 **********************************/

import service from '@/utils/common/request'

// 用户登录
export const Api_Common_User_Login = (data) => {
    return service({
        url: '/User/Login',
        method: 'post',
        data: data
    })
}

// 获取登录用户信息
export const Api_Common_User_GetUserInfo = () => {
    return service({
        url: '/User/GetUserInfo',
        method: 'get'
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
export const Api_Common_User_GetRoleEnums = () => {
    return service({
        url: '/Role/GetRoleEnums',
        method: 'get'
    })
}

// 分页获取用户列表
export const Api_Common_User_GetList = (data) => {
    return service({
        url: '/User/GetPageList',
        method: 'post',
        data: data
    })
}
