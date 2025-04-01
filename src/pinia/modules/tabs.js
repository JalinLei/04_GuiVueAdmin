import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import { UtilsCommon } from '@/utils'
import { useKeepAliveStore } from '@/pinia'
import piniaPersistConfig from '@/pinia/helper/persist'

export const useTabsStore = defineStore(
    'guiTabs',
    () => {
        const keepAliveStore = useKeepAliveStore()
        const tabsInstances = ref({})

        // 确保 keepAliveStore 初始化
        if (!keepAliveStore || !keepAliveStore.keepAliveName) {
            console.error('keepAliveStore 未正确初始化')
            return
        }

        // 获取指定 namespace 的 tab 列表
        const getTabs = (namespace) => {
            if (!tabsInstances.value[namespace]) {
                tabsInstances.value[namespace] = []
            }
            return tabsInstances.value[namespace]
        }

        // 添加 tab
        const addTabs = async (namespace, tabItem) => {
            const tabsMenuList = getTabs(namespace)
            if (!tabsMenuList.some((item) => item.path === tabItem.path)) {
                tabsMenuList.push(tabItem)
            }

            if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
                keepAliveStore.addKeepAliveName(tabItem.path)
            }
        }

        // 移除 tab
        const removeTabs = async (namespace, tabPath, isCurrent = true) => {
            const tabsMenuList = getTabs(namespace)
            if (isCurrent) {
                const index = tabsMenuList.findIndex((item) => item.path === tabPath)
                if (index !== -1) {
                    const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
                    if (nextTab) router.push(nextTab.path)
                }
            }

            const tabItem = tabsMenuList.find((item) => item.path === tabPath)
            if (tabItem?.isKeepAlive) keepAliveStore.removeKeepAliveName(tabItem.path)

            tabsInstances.value[namespace] = tabsMenuList.filter((item) => item.path !== tabPath)
        }

        // 关闭左右两侧的 Tabs
        const closeTabsOnSide = async (namespace, path, type) => {
            const tabsMenuList = getTabs(namespace)
            const currentIndex = tabsMenuList.findIndex((item) => item.path === path)

            if (currentIndex !== -1) {
                const range =
                    type === 'left' ? [0, currentIndex] : [currentIndex + 1, tabsMenuList.length]

                tabsInstances.value[namespace] = tabsMenuList.filter(
                    (item, index) => index < range[0] || index >= range[1] || !item.close
                )
            }

            const KeepAliveList = getTabs(namespace).filter((item) => item.isKeepAlive)
            keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.path))
        }

        // 关闭多个 Tabs
        const closeMultipleTab = async (namespace, tabsMenuValue) => {
            tabsInstances.value[namespace] = getTabs(namespace).filter(
                (item) => item.path === tabsMenuValue || !item.close
            )

            const KeepAliveList = getTabs(namespace).filter((item) => item.isKeepAlive)
            keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.path))
        }

        // 设置 tab 列表
        const setTabs = async (namespace, tabs) => {
            tabsInstances.value[namespace] = tabs
        }

        // 设置 tab 标题
        const setTabsTitle = async (namespace, title) => {
            tabsInstances.value[namespace].forEach((item) => {
                if (item.path === UtilsCommon.getUrlWithParams()) item.title = title
            })
        }

        // 重置所有 Tabs
        const resetTabs = () => {
            tabsInstances.value = {} // 清空所有 Tab 数据
            keepAliveStore.clearKeepAliveName() // 清空缓存的 KeepAlive 组件
        }

        return {
            resetTabs,
            addTabs,
            removeTabs,
            closeTabsOnSide,
            closeMultipleTab,
            setTabs,
            setTabsTitle,
            getTabs,
            tabsInstances
        }
    },
    {
        persist: piniaPersistConfig('guiTabs')
    }
)
