import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKeepAliveStore = defineStore('guiKeepAlive', () => {
    const keepAliveName = ref([])

    // Add KeepAliveName
    const addKeepAliveName = (name) => {
        if (!keepAliveName.value.includes(name)) {
            keepAliveName.value.push(name)
        }
    }

    // Remove KeepAliveName
    const removeKeepAliveName = (name) => {
        keepAliveName.value = keepAliveName.value.filter(item => item !== name)
    }

    // Set KeepAliveName
    const setKeepAliveName = (names) => {
        keepAliveName.value = names
    }

    // 清空所有缓存的 KeepAlive 组件
    const clearKeepAliveName = () => {
        keepAliveName.value = []
    }

    return {
        keepAliveName,
        addKeepAliveName,
        removeKeepAliveName,
        setKeepAliveName,
        clearKeepAliveName
    }
})
