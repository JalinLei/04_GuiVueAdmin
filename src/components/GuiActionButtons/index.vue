<template>
    <div class="gui-action-buttons">
        <!-- 默认 buttons 方式 -->
        <template v-for="(btn, index) in visiblePropButtons" :key="'prop-' + index">
            <el-button
                v-if="!resolveValue(btn.hidden)"
                :type="btn.type || 'primary'"
                link
                :disabled="resolveValue(btn.disabled)"
                @click="handleClick(btn)"
            >
                {{ btn.label }}
            </el-button>
        </template>

        <!-- 插槽按钮 -->
        <template v-for="(slotName, index) in visibleSlotNames" :key="'slot-' + slotName">
            <slot :name="slotName" />
        </template>

        <!-- 更多按钮 -->
        <el-dropdown v-if="hasDropdown" trigger="hover" class="ml-[10px]" popper-class="gui-dropdown__abs">
            <el-button type="primary" link>
                <el-icon>
                    <MoreFilled />
                </el-icon>
            </el-button>

            <template #dropdown>
                <el-dropdown-menu>
                    <!-- 传入的 buttons 超出部分 -->
                    <el-dropdown-item
                        v-for="(btn, index) in dropdownPropButtons"
                        :key="'dropdown-prop-' + index"
                        :disabled="resolveValue(btn.disabled)"
                        @click="handleClick(btn)"
                    >
                        {{ btn.label }}
                    </el-dropdown-item>

                    <!-- 插槽超出的部分 -->
                    <el-dropdown-item
                        v-for="(slotName, index) in dropdownSlotNames"
                        :key="'dropdown-slot-' + slotName"
                    >
                        <slot :name="slotName" />
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
    import { computed, useSlots } from 'vue'
    import { ArrowDown } from '@element-plus/icons-vue'

    const props = defineProps({
        buttons: {
            type: Array,
            default: () => []
        },
        maxVisible: {
            type: Number,
            default: 3
        }
    })

    const slots = useSlots()

    // 插槽按钮的名字列表，按默认顺序排列
    const slotNames = computed(() => Object.keys(slots).filter(key => key.startsWith('btn-')))

    // 计算展示区和下拉区的按钮
    const totalButtonCount = computed(() => {
        const visiblePropButtonCount = props.buttons.filter(btn => !resolveValue(btn.hidden)).length;
        const visibleSlotButtonCount = slotNames.value.filter(slot => !resolveValue(slots[slot]?.()[0]?.hidden)).length; // 插槽按钮的 hidden 判断
        return visiblePropButtonCount + visibleSlotButtonCount;
    })

    const visibleCount = computed(() => Math.min(props.maxVisible - 1, totalButtonCount.value))

    // 过滤掉 hidden 为 true 的按钮
    const visiblePropButtons = computed(() => {
        return props.buttons
            .filter(btn => !resolveValue(btn.hidden)) // 过滤掉 hidden 为 true 的按钮
            .slice(0, visibleCount.value);
    })

    const dropdownPropButtons = computed(() => {
        return props.buttons
            .filter(btn => !resolveValue(btn.hidden)) // 过滤掉 hidden 为 true 的按钮
            .slice(visibleCount.value);
    })

    const visibleSlotNames = computed(() => {
        // 过滤掉 hidden 为 true 的插槽按钮
        return slotNames.value
            .filter(slot => !resolveValue(slots[slot]?.()[0]?.hidden))
            .slice(0, visibleCount.value - visiblePropButtons.value.length);
    })

    const dropdownSlotNames = computed(() => {
        // 过滤掉 hidden 为 true 的插槽按钮
        return slotNames.value
            .filter(slot => !resolveValue(slots[slot]?.()[0]?.hidden))
            .slice(visibleCount.value - visiblePropButtons.value.length);
    })

    const hasDropdown = computed(() =>
        dropdownPropButtons.value.length > 0 || dropdownSlotNames.value.length > 0
    )

    const resolveValue = (val) => {
        return typeof val === 'function' ? val() : !!val
    }

    const handleClick = (btn) => {
        if (resolveValue(btn.disabled)) return
        if (typeof btn.onClick === 'function') btn.onClick()
    }
</script>

<style scoped lang="scss">
    .gui-action-buttons {
        display: flex;
        align-items: center;

        .el-button + .el-button {
            margin-left: 10px;
        }
    }
</style>
