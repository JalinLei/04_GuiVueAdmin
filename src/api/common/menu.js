/**********************************
 * @Desc: 菜单管理
 * @Author:  Jalin
 * @LastEditor: Jalin
 **********************************/

import service from '@/utils/common/request'

// 用户登录 获取动态路由
export const Api_Common_Menu_AsyncMenu = () => {
    return service({
        url: '/Menu/GetMenuList',
        method: 'get'
    })
}

// 获取menu列表
export const Api_Common_Menu_GetList = (data) => {
    return service({
        url: '/Menu/GetMenuList',
        method: 'get'
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
