<!--
 * @Author: Jalin
 * @Date: 2025-06-06 10:00:00
 * @LastEditors: Jalin
 * @LastEditTime: 2025-06-06 10:00:00
 * @Description: SVG图标
-->

<template>
    <div class="vvw vvh bg-white shadow gui-other-icon">
        <div class="p-4">
            <el-radio-group v-model="filterType" class="mb-4">
                <el-radio-button label="全部" value="all" />
                <el-radio-button label="线性" value="outlined" />
                <el-radio-button label="填充" value="fill" />
            </el-radio-group>

            <ul class="overflow-hidden list-none p-0 rounded-md grid grid-cols-7">
                <li v-for="icon in filteredIcons" :key="icon" class="flex flex-col items-center p-6 px-4 cursor-pointer" @click="handleCopy(icon)">
                    <GuiSvgIcon :name="icon" size="32px" color="#424242" />
                    <p class="mt-4">{{ icon }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import GuiSvgIcon from '@/components/GuiSvgIcon/svgIcon.vue'
    import { UtilsBom } from '@/utils'

    defineOptions({
        name: 'OtherIcon'
    })

    // 动态获取所有svg文件名（去掉后缀）
    const icons = Object.keys(import.meta.glob('@/assets/icons/*.svg')).map((path) => path.split('/').pop().replace('.svg', ''))

    const filterType = ref('all')

    const filteredIcons = computed(() => {
        if (filterType.value === 'all') return icons
        if (filterType.value === 'fill') return icons.filter(i => i.toLowerCase().includes('fill'))
        if (filterType.value === 'outlined') return icons.filter(i => !i.toLowerCase().includes('fill'))
        return icons
    })

    const handleCopy = (icon) => {
        UtilsBom.copyText(icon)
    }
</script>

<style lang="scss" scoped>
.gui-other-icon {
    ul {
        border-left: 1px solid var(--el-border-color);
        border-top: 1px solid var(--el-border-color);

        li {
        
            border-right: 1px solid var(--el-border-color);
            border-bottom: 1px solid var(--el-border-color);

            &::nth-child(-n+7) {
                border-top: 1px solid var(--el-border-color);
            }
        }
    }
}
</style>
