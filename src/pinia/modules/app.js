import { defineStore } from 'pinia'
import { ref, watchEffect, reactive } from 'vue'
import { setBodyPrimaryColor } from '@/utils/common/format'
import { useDark, usePreferredDark } from '@vueuse/core'

// 获取系统配置文件
async function loadAppConfig() {
    const res = await fetch(`/config/app.json`)
    const config = await res.json()
    return config
}

export const useAppStore = defineStore('app', () => {
    const device = ref('')
    const drawerSize = ref('')
    const operateMinWith = ref('240')
    const config = reactive({
        weakness: false, // 色弱模式
        grey: false, // 灰色模式
        primaryColor: '#1A73E8', // 主色
        showTabs: true, // 显示标签页
        darkMode: 'auto', // 默认主题 dark | light | auto
        layout_side_width: 256,
        layout_side_collapsed_width: 80,
        layout_side_item_height: 56,
        show_watermark: false,
        side_mode: 'head', // 菜单模式  combination | normal | head
        // 页面过渡动画配置
        transition_type: 'slide'
    })

    const isDark = useDark({
        selector: 'html',
        attribute: 'class',
        valueDark: 'dark',
        valueLight: 'light'
    })

    const preferredDark = usePreferredDark()

    const toggleTheme = (darkMode) => {
        isDark.value = darkMode
    }

    const toggleWeakness = (e) => {
        config.weakness = e
    }

    const toggleGrey = (e) => {
        config.grey = e
    }

    const togglePrimaryColor = (e) => {
        config.primaryColor = e
    }

    const toggleTabs = (e) => {
        config.showTabs = e
    }

    const toggleDevice = (e) => {
        if (e === 'mobile') {
            drawerSize.value = '100%'
            operateMinWith.value = '80'
        } else {
            drawerSize.value = '800'
            operateMinWith.value = '240'
        }
        device.value = e
    }

    const toggleDarkMode = (e) => {
        config.darkMode = e
    }

    // 监听系统主题变化
    watchEffect(() => {
        if (config.darkMode === 'auto') {
            isDark.value = preferredDark.value
            return
        }
        isDark.value = config.darkMode === 'dark'
    })

    const toggleConfigSideWidth = (e) => {
        config.layout_side_width = e
    }

    const toggleConfigSideCollapsedWidth = (e) => {
        config.layout_side_collapsed_width = e
    }

    const toggleConfigSideItemHeight = (e) => {
        config.layout_side_item_height = e
    }

    const toggleConfigWatermark = (e) => {
        config.show_watermark = e
    }

    const toggleSideMode = (e) => {
        config.side_mode = e
    }

    const toggleTransition = (e) => {
        config.transition_type = e
    }

    // 监听色弱模式和灰色模式
    watchEffect(() => {
        document.documentElement.classList.toggle('html-weakenss', config.weakness)
        document.documentElement.classList.toggle('html-grey', config.grey)
    })

    // 监听主题色
    watchEffect(() => {
        setBodyPrimaryColor(config.primaryColor, isDark.value ? 'dark' : 'light')
    })

    // 是否在加载中
    const loading = ref(false)

    // 系统配置数据（系统名称、系统描述等）
    const appConfig = ref({})

    // 获取系统配置
    const fetchAppConfig = async () => {
        loading.value = true;
        try {
            let data = await loadAppConfig()
            
            appConfig.value = {
                ...data
            }
        } catch (error) {
            console.error('加载系统配置数据失败', error)
        } finally {
            loading.value = false
        }
    }

    return {
        isDark,
        device,
        drawerSize,
        operateMinWith,
        config,
        toggleTheme,
        toggleDevice,
        toggleWeakness,
        toggleGrey,
        togglePrimaryColor,
        toggleTabs,
        toggleDarkMode,
        toggleConfigSideWidth,
        toggleConfigSideCollapsedWidth,
        toggleConfigSideItemHeight,
        toggleConfigWatermark,
        toggleSideMode,
        toggleTransition,

        fetchAppConfig,
        appConfig
    }
})
