<!--------------------------------
 - @Desc: Header头部
 - @Author: Jalin
 --------------------------------->

<template>
    <div class="gui-header h-[64px] flex justify-between fixed top-0 left-0 right-0 z-10 shadow items-center">
        <div class="vvh flex items-center cursor-pointer flex-1">
            <div class="vvh flex items-center cursor-pointer" :class="isMobile ? '' : 'min-w-[256px]'" @click="router.push({ path: '/' })">
                <img alt class="h-12" :src="$GUI_VUE_ADMIN.appLogo" />
                <div v-if="!isMobile" class="gui-header--logo inline-flex font-bold text-[24px] ml-2"
                     :class=" (config.side_mode === 'head' || config.side_mode === 'combination') && 'min-w-fit'"
                >
                    {{ $GUI_VUE_ADMIN.appName }}
                </div>
            </div>

            <el-breadcrumb v-show="!isMobile" v-if="config.side_mode !== 'head' && config.side_mode !== 'combination'" class="ml-4">
                <el-breadcrumb-item v-for="item in matched.slice(1, matched.length)" :key="item.path">
                    {{ fmtTitle(item.meta.title, route) }}
                </el-breadcrumb-item>
            </el-breadcrumb>

            <gui-aside v-if="config.side_mode === 'head' && !isMobile" class="vvh flex-1" />
            <gui-aside v-if="config.side_mode === 'combination' && !isMobile" mode="head" class="vvh flex-1" />
        </div>

        <div class="ml-2 flex items-center vvh">
            <tools />

            <el-dropdown>
                <div class="vvh flex justify-center items-center h-full w-full ml-[10px]">
                    <span class="cursor-pointer flex justify-center items-center ">
                        <GuiCustomPic :avatar-size="24" />

                        <span v-show="!isMobile" class="gui-header--user">{{userStore.userInfo.nickName }}</span>
                        <el-icon>
                            <arrow-down />
                        </el-icon>
                    </span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="userStore.LoginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
    import tools from './tools.vue'
    import { GuiCustomPic} from '@/components'
    import { useUserStore } from '@/pinia/modules/user'
    import { useRoute, useRouter } from 'vue-router'
    import { useAppStore } from '@/pinia'
    import { storeToRefs } from 'pinia'
    import { computed } from 'vue'
    import { fmtTitle } from '@/utils/common/fmtRouterTitle'
    import guiAside from '@/view/layout/aside/index.vue'

    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()
    const appStore = useAppStore()
    const { device, config } = storeToRefs(appStore)
    const isMobile = computed(() => {
        return device.value === 'mobile'
    })
    const matched = computed(() => route.meta.matched)
</script>

<style scoped lang="scss"></style>
