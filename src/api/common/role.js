/**********************************
 * @Desc: 角色管理
 * @Author:  Jalin
 **********************************/

import service from '@/utils/common/request'

// 获取角色列表（分页查询）
export const Api_Common_Role_GetRoleList = (data) => {
    return service({
        url: '/Role/GetPageList',
        method: 'post',
        data
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
