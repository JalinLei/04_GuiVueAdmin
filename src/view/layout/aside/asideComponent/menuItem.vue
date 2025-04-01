<template>
    <el-menu-item
        :index="routerInfo.name"
        class="overflow-hidden"
        :style="{
            height: isCtrlHeight ? sideHeight : 'auto'
        }"
    >
        <el-icon v-if="routerInfo.meta.icon && isShowIcon">
            <component :is="routerInfo.meta.icon" />
        </el-icon>

        <template #title>
            {{ routerInfo.meta.title }}
        </template>
    </el-menu-item>
</template>

<script setup>
    import { computed } from 'vue'
    import { useAppStore } from '@/pinia'
    import { storeToRefs } from 'pinia'

    const appStore = useAppStore()
    const { config } = storeToRefs(appStore)

    defineOptions({
        name: 'MenuItem'
    })

    defineProps({
        routerInfo: {
            default: function() {
                return null
            },
            type: Object
        },
        isCtrlHeight: {
            type: Boolean,
            default: true
        },
        isShowIcon: {
            type: Boolean,
            default: true
        }
    })

    const sideHeight = computed(() => {
        return config.value.layout_side_item_height + 'px'
    })
</script>

<style lang="scss"></style>
