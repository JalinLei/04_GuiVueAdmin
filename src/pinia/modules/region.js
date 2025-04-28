import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 模拟根据地区加载对应配置
async function loadRegionConfig() {
    const res = await fetch(`/config/sign.json`)
    const config = await res.json()
    return {
        data: config?.Region?.Data || [],
        curKey: config?.Region?.CurKey,
    };
}

export const useRegionStore  = defineStore('region', () => {
    // 地区枚举数据
    const regionEnums = ref([])
    // 当前地区key值
    const regionCurKey = ref(1)
    // 是否在加载中
    const loading = ref(false)


    const fetchRegionConfig = async () => {
        loading.value = true;
        try {
            const regionConfig = await loadRegionConfig()

            regionEnums.value = regionConfig.data
            regionCurKey.value = regionConfig.curKey
        } catch (error) {
            console.error('加载地区配置失败', error)
        } finally {
            loading.value = false
        }
    }

    // 是否是基础版本
    const isBase = computed(() => {
        return regionCurKey.value === 1
    })


    return {
        fetchRegionConfig,

        regionEnums,
        regionCurKey,
        isBase
    }
})
