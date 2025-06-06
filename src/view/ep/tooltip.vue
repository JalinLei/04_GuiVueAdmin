<!--------------------------------
 - @Desc: ElementPlus组件——文字提示
 - @Author: Jalin
 --------------------------------->

<template>
    <div class="vvw vvh bg-white shadow p-6">
        <el-tooltip
        class="box-item"
        effect="dark"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        placement="top-start"
      >
        <el-button>top-start</el-button>
      </el-tooltip>
    </div>
</template>

<script setup>
    import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'

    defineOptions({
        name: 'EpTooltip'
    })
</script>

<style lang="scss" scoped></style>
