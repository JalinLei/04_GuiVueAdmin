<template>
    <div class="vvh mx-2 flex items-center w-[calc(100vw-600px)] overflow-auto">
        <el-menu
            :default-active="active"
            mode="horizontal"
            class="vvh border-r-0 w-full flex items-center box-border"
            unique-opened
            @select="selectMenuItem">
            <template v-for="item in headerMenuData">
                <aside-component
                    v-if="!item.hidden"
                    :key="item.name"
                    :router-info="item"
                    mode="horizontal"
                    :is-ctrl-height="false"
                    :is-show-icon="false" />
            </template>
        </el-menu>
    </div>
</template>

<script setup>
    import AsideComponent from '@/view/layout/aside/asideComponent/index.vue'
    import { ref, provide, watchEffect, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useRouterStore } from '@/pinia/modules/router'
    import { useAppStore } from '@/pinia'
    import { storeToRefs } from 'pinia'

    const appStore = useAppStore()
    const { device } = storeToRefs(appStore)

    defineOptions({
        name: 'GuiAside'
    })
    const route = useRoute()
    const router = useRouter()
    const routerStore = useRouterStore()
    const isCollapse = ref(false)
    const active = ref('')
    watchEffect(() => {
        if (route.name === 'Iframe') {
            active.value = decodeURIComponent(route.query.url)
            return
        }
        active.value = route.meta.activeName || route.name
    })

    watchEffect(() => {
        if (device.value === 'mobile') {
            isCollapse.value = true
        } else {
            isCollapse.value = false
        }
    })

    provide('isCollapse', isCollapse)

    const selectMenuItem = (index) => {
        const query = {}
        const params = {}
        routerStore.routeMap[index]?.parameters &&
        routerStore.routeMap[index]?.parameters.forEach((item) => {
            if (item.type === 'query') {
                query[item.key] = item.value
            } else {
                params[item.key] = item.value
            }
        })
        if (index === route.name) return
        if (index.indexOf('http://') > -1 || index.indexOf('https://') > -1) {
            if (index === 'Iframe') {
                query.url = decodeURIComponent(index)
                router.push({
                    name: 'Iframe',
                    query,
                    params
                })
                return
            } else {
                window.open(index, '_blank')
                return
            }
        } else {
            router.push({ name: index, query, params })
        }
    }

    const headerMenuData = computed(() => {
        let filterRoutes = (routes) => {
            return routes
                .filter(route => {
                    return !route.hidden
                })
                .map(route => ({
                    ...route,
                    children: route.children && route.children.length > 0
                        ? filterRoutes(route.children) // 递归处理 children
                        : [] // 保持为空数组，避免 v-for 遍历时报错
                }));
        }

        return filterRoutes(routerStore.asyncRouters[0].children || [])
    })
</script>

<style lang="scss" scoped>
    .el-menu--horizontal.el-menu,
    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: none !important;
    }

    .el-menu-item.is-active {
        background-color: var(--el-color-primary-light-8) !important;
    }

    .dark {
        .el-menu-item.is-active {
            background-color: var(--el-color-primary-bg) !important;
        }
    }
</style>
