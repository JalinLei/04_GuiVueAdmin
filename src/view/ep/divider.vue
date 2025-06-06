<!--------------------------------
 - @Desc: ElementPlus组件——分割线
 - @Author: Jalin
 --------------------------------->

<template>
    <div class="vvw vvh bg-white shadow p-6">
        <el-divider />
        <el-divider content-position="left">Left</el-divider>
        <el-divider content-position="right">Right</el-divider>

        <h3 class="text-lg font-bold mb-4">垂直分隔线</h3>
        <div>
            <span>Rain</span>
            <el-divider direction="vertical" />
            <span>Home</span>
            <el-divider direction="vertical" border-style="dashed" />
            <span>Grass</span>
        </div>
    </div>
</template>

<script setup>
    import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'

    defineOptions({
        name: 'EpDivider'
    })
</script>

<style lang="scss" scoped></style>
