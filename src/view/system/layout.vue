<template>
    <div class="vvw vvh">
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="el-fade-in-linear">
                <keep-alive :include="routerStore.keepAliveRouters">
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup>
    defineOptions({
        name: 'SystemLayout'
    })
    import { useRouterStore } from '@/pinia/modules/router'

    const routerStore = useRouterStore()
</script>
