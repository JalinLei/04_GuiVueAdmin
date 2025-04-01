<template>
    <el-sub-menu
        ref="subMenu"
        :index="routerInfo.name"
        class="relative"
    >
        <template #title>
            <div
                v-if="!isCollapse"
                class="flex items-center"
                :style="{
                    height: sideHeight
                }"
            >
                <el-icon v-if="routerInfo.meta.icon && isShowIcon">
                    <component :is="routerInfo.meta.icon" />
                </el-icon>
                <span>{{ routerInfo.meta.title }}</span>
            </div>

            <template v-else>
                <el-icon v-if="routerInfo.meta.icon && isShowIcon">
                    <component :is="routerInfo.meta.icon" />
                </el-icon>
                <span>{{ routerInfo.meta.title }}</span>
            </template>
        </template>
        <slot />
    </el-sub-menu>
</template>

<script setup>
    import { inject, computed } from 'vue'
    import { useAppStore } from '@/pinia'
    import { storeToRefs } from 'pinia'

    const appStore = useAppStore()
    const { config } = storeToRefs(appStore)

    defineOptions({
        name: 'AsyncSubmenu'
    })

    const props = defineProps({
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

    const isCollapse = inject('isCollapse', {
        default: false
    })

    const sideHeight = computed(() => {
        if (!props.isCtrlHeight) {
            return 'auto'
        } else {
            return config.value.layout_side_item_height + 'px'
        }
    })
</script>

<style lang="scss"></style>
