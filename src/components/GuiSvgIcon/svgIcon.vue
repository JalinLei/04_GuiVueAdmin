<template>
    <svg class="gui-svg" :class="svgClass" v-bind="$attrs" :style="{ fill: color, width: size, height: size }">
        <use :xlink:href="'#' + name" rel="external nofollow" />
    </svg>
</template>
<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'currentColor'
        },
        size: {
            type: [String, Number],
            default: "1em", // 让图标默认继承父组件的 font-size
        },
    })

    const svgClass = computed(() => {
        if (props.name) {
            return `svg-icon ${props.name}`
        }
        return 'svg-icon'
    })
</script>
<style scoped>
    .svg-icon {
        @apply w-4 h-4;
        fill: currentColor;
        vertical-align: middle;
    }
</style>
