<template>
    <div class="gui-layout w-full h-full">
        <el-watermark
            v-if="config.show_watermark"
            :font="font"
            :z-index="9999"
            :gap="[180, 150]"
            class="absolute inset-0 pointer-events-none"
            :content="userStore.userInfo.nickName"
        />

        <gui-header />

        <div class="gui-layout__body flex flex-row w-full pt-[64px] box-border h-full">
            <gui-aside
                v-if="
                  config.side_mode === 'normal' ||
                  (device === 'mobile' && config.side_mode == 'head') ||
                  (device === 'mobile' && config.side_mode == 'combination')
                "
            />

            <gui-aside v-if="config.side_mode === 'combination' && device !== 'mobile'" mode="normal" />

            <div class="gui-layout__container flex-1 p-[16px] w-0 h-full">
                <gui-tabs v-if="config.showTabs" />

                <div class="overflow-auto gui-layout__content" :class="config.showTabs ? 'mt-[16px]' : ''"
                     :style="{
                        height: config.showTabs ? 'calc(100% - 48px - 16px)' : '100%'
                    }">
                    <router-view v-if="reloadFlag" v-slot="{ Component, route }">
                        <div id="GuiBaseLoadDom" class="vvw vvh">
                            <transition mode="out-in" :name="route.meta.transitionType || config.transition_type">
                                <keep-alive :include="routerStore.keepAliveRouters">
                                    <component :is="Component" :key="route.fullPath" />
                                </keep-alive>
                            </transition>
                        </div>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import GuiAside from '@/view/layout/aside/index.vue'
    import GuiHeader from '@/view/layout/header/index.vue'
    import useResponsive from '@/hooks/other/responsive'
    import GuiTabs from './tabs/index.vue'
    import { emitter } from '@/utils/common/bus.js'
    import { ref, onMounted, nextTick, reactive, watchEffect } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useRouterStore } from '@/pinia/modules/router'
    import { useUserStore } from '@/pinia/modules/user'
    import { useAppStore } from '@/pinia'
    import { storeToRefs } from 'pinia'
    import '@/style/common/transition.scss'

    const appStore = useAppStore()
    const { config, isDark, device } = storeToRefs(appStore)

    defineOptions({
        name: 'GvaLayout'
    })

    useResponsive(true)
    const font = reactive({
        color: 'rgba(0, 0, 0, .15)'
    })

    watchEffect(() => {
        font.color = isDark.value ? 'rgba(255,255,255, .15)' : 'rgba(0, 0, 0, .15)'
    })

    const router = useRouter()
    const route = useRoute()
    const routerStore = useRouterStore()

    onMounted(() => {
        // 挂载一些通用的事件
        emitter.on('reload', reload)
        if (userStore.loadingInstance) {
            userStore.loadingInstance.close()
        }
    })

    const userStore = useUserStore()

    const reloadFlag = ref(true)
    let reloadTimer = null
    const reload = async () => {
        if (reloadTimer) {
            window.clearTimeout(reloadTimer)
        }
        reloadTimer = window.setTimeout(async () => {
            if (route.meta.keepAlive) {
                reloadFlag.value = false
                await nextTick()
                reloadFlag.value = true
            } else {
                const title = route.meta.title
                router.push({ name: 'Reload', params: { title } })
            }
        }, 400)
    }
</script>

<style lang="scss"></style>
