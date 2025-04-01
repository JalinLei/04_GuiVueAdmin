<template>
    <el-dropdown class="tabs-component__dropdown">
        <span class="el-dropdown-link">
            <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="refresh">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                    刷新
                </el-dropdown-item>
                <el-dropdown-item @click="maximize">
                    <el-icon>
                        <FullScreen />
                    </el-icon>
                    最大化
                </el-dropdown-item>
                <el-dropdown-item divided @click="closeCurrentTab">
                    <el-icon>
                        <Remove />
                    </el-icon>
                    关闭当前
                </el-dropdown-item>
                <el-dropdown-item @click="tabStore.closeTabsOnSide(props.namespace, route.fullPath, 'left')">
                    <el-icon>
                        <DArrowLeft />
                    </el-icon>
                    关闭左侧
                </el-dropdown-item>
                <el-dropdown-item @click="tabStore.closeTabsOnSide(props.namespace, route.fullPath, 'right')">
                    <el-icon>
                        <DArrowRight />
                    </el-icon>
                    关闭右侧
                </el-dropdown-item>
                <el-dropdown-item divided @click="tabStore.closeMultipleTab(props.namespace, route.fullPath)">
                    <el-icon>
                        <CircleClose />
                    </el-icon>
                    关闭其他
                </el-dropdown-item>
                <el-dropdown-item @click="closeAllTab">
                    <el-icon>
                        <FolderDelete />
                    </el-icon>
                    关闭所有
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

    <!--    <el-dropdown trigger="click" :teleported="false">
            <div class="more-button">
                <el-icon>
                    <Refresh/>
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="refresh">
                        <el-icon>
                            <Refresh/>
                        </el-icon>
                        刷新
                    </el-dropdown-item>
                    <el-dropdown-item @click="maximize">
                        <el-icon>
                            <FullScreen/>
                        </el-icon>
                        最大化
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="closeCurrentTab">
                        <el-icon>
                            <Remove/>
                        </el-icon>
                        关闭当前
                    </el-dropdown-item>
                    <el-dropdown-item @click="tabStore.closeTabsOnSide(props.namespace, route.fullPath, 'left')">
                        <el-icon>
                            <DArrowLeft/>
                        </el-icon>
                        关闭左侧
                    </el-dropdown-item>
                    <el-dropdown-item @click="tabStore.closeTabsOnSide(props.namespace, route.fullPath, 'right')">
                        <el-icon>
                            <DArrowRight/>
                        </el-icon>
                       关闭右侧
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="tabStore.closeMultipleTab(props.namespace, route.fullPath)">
                        <el-icon>
                            <CircleClose/>
                        </el-icon>
                        关闭其他
                    </el-dropdown-item>
                    <el-dropdown-item @click="closeAllTab">
                        <el-icon>
                            <FolderDelete/>
                        </el-icon>
                        关闭所有
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>-->
</template>

<script setup>
    import { inject, nextTick } from 'vue'
    import { useTabsStore, useKeepAliveStore } from '@/pinia'
    import { useRoute, useRouter } from 'vue-router'
    import { CircleClose, DArrowLeft, DArrowRight, FolderDelete, FullScreen, Remove } from '@element-plus/icons-vue'

    const props = defineProps({
        // 接收 namespace 作为唯一标识
        namespace: {
            type: String,
            required: true
        }
    })

    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabsStore()
    const keepAliveStore = useKeepAliveStore()

    // refresh current page
    const refreshCurrentPage = inject('refresh')
    const refresh = () => {
        setTimeout(() => {
            route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath)
            refreshCurrentPage(false)
            nextTick(() => {
                route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath)
                refreshCurrentPage(true)
            })
        }, 0)
    }

    // maximize current page
    const maximize = () => {
        // globalStore.setGlobalState("maximize", true);
    }

    // Close Current
    const closeCurrentTab = () => {
        if (route.meta.isAffix) return
        tabStore.removeTabs(props.namespace, route.fullPath)
    }

    // Close All
    const closeAllTab = () => {
        tabStore.closeMultipleTab()
        router.push('/')
    }
</script>

<style scoped lang="scss">
    @use "../index";
</style>
