<template>
    <div class="gui-admin w-full h-full overflow-hidden">
        <el-config-provider :locale="zhCn">
            <router-view />
        </el-config-provider>
    </div>
</template>

<script setup>
    import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
    import { useAppStore } from '@/pinia'

    useAppStore()
    defineOptions({
        name: 'App'
    })
</script>

<style lang="scss"></style>
