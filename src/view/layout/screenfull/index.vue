<template>
    <el-tooltip class="" effect="dark" :content="isShow ? '全屏' : '退出全屏'" placement="bottom">
        <el-icon class="w-8 h-8 shadow rounded-full border border-gray-200 dark:border-gray-600 cursor-pointer border-solid" @click="clickFull">
            <GgiFullscreen v-if="isShow" />
            <GgiFullscreenExit v-else />
        </el-icon>
    </el-tooltip>
</template>

<script setup>
    import screenfull from 'screenfull' // 引入screenfull
    import { onMounted, onUnmounted, ref } from 'vue'

    defineOptions({
        name: 'Screenfull'
    })

    defineProps({
        width: {
            type: Number,
            default: 22
        },
        height: {
            type: Number,
            default: 22
        },
        fill: {
            type: String,
            default: '#48576a'
        }
    })

    onMounted(() => {
        if (screenfull.isEnabled) {
            screenfull.on('change', changeFullShow)
        }
    })

    onUnmounted(() => {
        screenfull.off('change')
    })

    const clickFull = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
        }
    }

    const isShow = ref(true)
    const changeFullShow = () => {
        isShow.value = !screenfull.isFullscreen
    }
</script>

<style scoped lang="scss"></style>
