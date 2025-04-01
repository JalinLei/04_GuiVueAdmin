<template>
    <el-dropdown trigger="click" :hide-on-click="false" size="large" popper-class="gui-dropdown__table">
        <el-button link type="primary" style="margin-left: 8px">
            {{ buttonText }}
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </el-button>

        <template v-slot:dropdown>
            <el-dropdown-menu>
                <template v-for="item in dropdownList" :key="item.title">
                    <el-dropdown-item v-if="!item.children" @click="handleItemClick(item)" :disabled="item.disabled">{{ item.title }}</el-dropdown-item>
                    <el-dropdown-item v-else>
                        <el-dropdown placement="left-start" size="large" popper-class="gui-dropdown__table-cascader">
                            <el-button link>
                                {{ item.title }}
                                <el-icon>
                                    <ArrowRight />
                                </el-icon>
                            </el-button>

                            <template v-slot:dropdown>
                                <el-dropdown-menu>
                                    <template v-for="child in item.children" :key="child.title">
                                        <el-dropdown-item @click="handleItemClick(child)" :disabled="child.disabled">{{ child.title }}</el-dropdown-item>
                                    </template>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-dropdown-item>
                </template>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
    import { defineProps } from 'vue'
    import { ElDropdown, ElButton, ElIcon, ElDropdownMenu, ElDropdownItem } from 'element-plus'
    import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'

    // Props
    const props = defineProps({
        dropdownList: {
            type: Array,
            required: true
        },
        buttonText: {
            type: String,
            default: '更多'
        }
    })

    // Emits
    const emit = defineEmits(['onItemClick'])

    const handleItemClick = (item) => {
        emit('onClick', item)
    }
</script>

<style lang="scss">
.gui-dropdown__table {
    .el-popper__arrow {
        display: none;
    }
    .el-dropdown-menu__item {
        min-width: 120px;
    }
}
.gui-dropdown__table-cascader {
    margin-right: 12px;
    .el-popper__arrow {
        display: none;
    }
    .el-dropdown-menu__item {
        min-width: 120px;
    }
}
</style>
