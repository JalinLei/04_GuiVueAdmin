<script setup>
    import { ref, provide, h } from 'vue'
    import { GuiTabs } from '@/components/GuiTabs'
    import { useKeepAliveStore } from '@/pinia'
    import { storeToRefs } from 'pinia'

    defineOptions({
        name: 'GuiTabsLayout'
    })

    const props = defineProps({
        // 路由名称（name）或者路由路径（path）
        namespace: {
            required: true,
            type: String
        }
    })

    const keepAliveStore = useKeepAliveStore()
    const { keepAliveName } = storeToRefs(keepAliveStore)

    // 注入刷新页面方法
    const isRouterShow = ref(true)
    const refreshCurrentPage = val => (isRouterShow.value = val)
    provide('refresh', refreshCurrentPage)

    // 解决详情页 keep-alive 问题
    const wrapperMap = new Map()

    function createComponentWrapper(component, route) {
        if (!component) return
        const wrapperName = route.fullPath
        let wrapper = wrapperMap.get(wrapperName)
        if (!wrapper) {
            wrapper = { name: wrapperName, render: () => h(component) }
            wrapperMap.set(wrapperName, wrapper)
        }
        return h(wrapper)
    }
</script>

<template>
    <div class="gui-tabs-layout vvw vvh">
        <gui-tabs :namespace="props.namespace" />

        <div class="tabs-layout__body">
            <router-view v-slot="{ Component, route }">
                <transition appear name="fade-transform" mode="out-in">
                    <keep-alive :include="keepAliveName">
                        <component
                            v-if="isRouterShow"
                            :is="createComponentWrapper(Component, route)"
                            :key="route.name" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss">
.gui-tabs-layout {
    .tabs-layout__body {
        margin-top: 16px;
        height: calc(100% - 41px - 16px)
    }
}
</style>
