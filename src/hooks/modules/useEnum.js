/**********************************
 * @Desc: 获取枚举数据（支持传多个类型）
 * @Author:  Jalin
 **********************************/

import { ref } from 'vue'
import { UtilsDictionary } from '@/utils'

/**
 * 自定义 hook：useEnum
 * @param {String|Ref} type - 枚举类型，可以是字符串或响应式引用
 * @returns {Object} - 包括枚举数据和加载状态
 */
export function useEnum() {
    const dictEnums = ref({})
    const loading = ref(false)
    const error = ref(null)

    const fetchDictionaries = async (...dictTypes) => {
        loading.value = true;
        error.value = null;
        dictEnums.value = {}; // 初始化为一个空对象
        try {
            const types = dictTypes.flat(); // 支持直接传入数组或多个字符串
            const results = await Promise.all(
                types.map((type) => UtilsDictionary.getDict(type))
            );

            results.forEach((data, index) => {
                dictEnums.value[types[index]] = data;
            });

            // 数据加载完成后返回 Promise
            return dictEnums.value;
        } catch (err) {
            error.value = err.message || '获取字典数据出错';
        } finally {
            loading.value = false;
        }
    };

    return {
        dictEnums,
        loading,
        error,
        fetchDictionaries
    }
}

