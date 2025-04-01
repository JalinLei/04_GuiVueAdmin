/**********************************
 * @Desc: 针对日期时间操作的方法
 * @Author:  Jalin
 **********************************/

import moment from 'moment'

/**
 * 格式化日期时间
 * @param {string|Date} date - 需要格式化的日期，可以是字符串或 Date 对象
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
export const formatDateTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!date) {
        return ''
    }
    return moment(date).format(format)
}
