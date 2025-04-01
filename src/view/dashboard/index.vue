<template>
    <div class="vvw vvh bg-white shadow p-6">
        <div class="mb-4">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </div>

        <div class="mb-4">
            <el-icon :size="56" :color="'#ff0000'">
                <GgiHome />
            </el-icon>

            <el-icon :size="36">
                <GgiHomeFill />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
    defineOptions({
        name: 'Dashboard'
    })
</script>

<style lang="scss" scoped></style>
