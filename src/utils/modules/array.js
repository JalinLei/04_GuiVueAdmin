/**********************************
 * @Desc: 针对数组操作
 * @Author:  Jalin
 **********************************/

/**
 * 根据对象数组中指定的字段值查找对应的目标字段值
 * @param {Array} arr - 数据数组，例如枚举值数组
 * @param {string|number} searchValue - 要查找的值
 * @param {string} searchKey - 查找时的字段名
 * @param {string} targetKey - 要返回的目标字段名
 * @param {any} defaultValue - 如果未找到时返回的默认值，默认为 null
 * @returns {any} 目标字段的值，如果未找到则返回默认值
 */
export const getEnumLabel = (arr, searchValue, searchKey = 'value', targetKey = 'label', defaultValue = null) => {
    if (!arr) {
        return ''
    }

    // 查找数组中的匹配项
    const foundItem = arr.find(item => item[searchKey] === searchValue);
    // 返回目标字段的值，如果未找到则返回默认值
    return foundItem ? foundItem[targetKey] : defaultValue;
}
