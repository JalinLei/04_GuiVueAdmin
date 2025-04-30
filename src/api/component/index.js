/**********************************
 * @Desc: 组件
 * @Author:  Jalin
 **********************************/

import service from '@/utils/common/request'

// 获取列表（分页）
export const Api_Component_GetPageList = (data) => {
    return service({
        url: '/Component/GetPageList',
        method: 'post',
        data: data
    })
}
