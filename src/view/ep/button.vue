<!--------------------------------
 - @Desc: ElementPlus组件——按钮
 - @Author: Jalin
 --------------------------------->

<template>
    <div class="vvw vvh bg-white shadow p-6">
        <el-row class="mb-4">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </el-row>

        <el-row class="mb-4">
            <el-button disabled>Default</el-button>
            <el-button type="primary" disabled>Primary</el-button>
            <el-button type="success" disabled>Success</el-button>
            <el-button type="info" disabled>Info</el-button>
            <el-button type="warning" disabled>Warning</el-button>
            <el-button type="danger" disabled>Danger</el-button>
        </el-row>
    </div>
</template>

<script setup>
    import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'

    defineOptions({
        name: 'EpButton'
    })
</script>

<style lang="scss" scoped></style>
