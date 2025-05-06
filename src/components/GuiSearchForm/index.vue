<template>
    <div v-if="columns.length" class="pro-table__card table-search">
        <div ref="tableSearchL" class="table-search__l" :style="{ height: collapsed && showCollapseButton ? '56px' : 'auto' }">
            <el-form ref="formRef" :model="searchParam" :inline="true">
                <el-form-item v-for="(item, index) in columns" :key="item.prop" :index="index">
                    <template #label>
                        <el-space :size="4">
                            <span>
                                <span>{{ `${item.search?.label ?? item.label}` }}</span>
                                <el-tooltip v-if="item.search?.tooltip" effect="dark" :content="item.search?.tooltip" placement="top">
                                    <i :class="'iconfont icon-yiwen'"></i>
                                </el-tooltip>
                            </span>
                        </el-space>
                        <span>：</span>
                    </template>

                    <SearchFormItem :column="item" :search-param="searchParam" />
                </el-form-item>
            </el-form>
        </div>
        <div class="table-search__r">
            <!-- 控制按钮是否显示 -->
            <el-button v-if="showCollapseButton" type="primary" link class="search-isOpen" @click="toggleCollapse">
                {{ collapsed ? '展开' : '合并' }}
                <el-icon class="el-icon--right">
                    <component :is="collapsed ? ArrowDown : ArrowUp"></component>
                </el-icon>
            </el-button>

            <el-button type="primary" @click="search"> 搜索</el-button>
            <el-button @click="reset"> 重置</el-button>
        </div>
    </div>
</template>

<script setup name="GuiSearchForm">
    import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
    import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
    import SearchFormItem from './components/SearchFormItem.vue'

    // 默认值
    const props = defineProps({
        searchParam: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Array,
            default: () => []
        },
        searchCol: {
            type: [Number, Object],
            default: () => {}
        },
        search: {
            type: Function,
            default: () => {}
        },
        reset: {
            type: Function,
            default: () => {}
        }
    })

    // 是否默认折叠搜索项
    const collapsed = ref(true)
    const showCollapseButton = ref(false)

    // table-search__l 容器引用
    const tableSearchL = ref(null)
    const formItems = ref([])

    // 切换折叠状态
    const toggleCollapse = () => {
        collapsed.value = !collapsed.value
    }

    // 计算和判断是否需要显示折叠按钮
    const checkIfCollapseNeeded = () => {
        nextTick(() => {
            if (tableSearchL.value && formItems.value.length) {
                // 获取 .table-search__l 的可视宽度
                const containerWidth = tableSearchL.value.clientWidth
                // 计算所有 el-form-item 的总宽度
                const totalWidth = formItems.value.reduce((total, item) => total + item.clientWidth, 0)

                // 如果 el-form-item 总宽度大于容器宽度，则显示折叠按钮
                showCollapseButton.value = totalWidth > containerWidth
            }
        })
    }

    // 监听窗口尺寸变化
    const resizeObserver = new ResizeObserver(() => {
        checkIfCollapseNeeded()
    })

    // 初始化时执行
    onMounted(() => {
        // 获取所有 el-form-item 的引用
        if (props.columns && props.columns.length) {
            formItems.value = Array.from(tableSearchL.value?.querySelectorAll('.el-form-item'))

            // 监听容器宽度变化
            if (tableSearchL.value) {
                resizeObserver.observe(tableSearchL.value)
            }

            // 初始检查是否需要显示折叠按钮
            checkIfCollapseNeeded()
        }
    })

    // 清理 ResizeObserver
    onUnmounted(() => {
        if (resizeObserver && tableSearchL.value) {
            resizeObserver.unobserve(tableSearchL.value)
        }
    })
</script>

<style lang="scss" scoped>
    .table-search {
        display: flex;
        justify-content: space-between;
    }

    .table-search__l {
        flex: 1;
        overflow: hidden;
        transition: height 0.3s ease-in-out;

        ::v-deep(.el-form-item__content) {
            width: 210px;
        }

        ::v-deep(.el-form-item__label) {
            min-width: 105px;
        }

        ::v-deep(.el-form-item) {
            margin-bottom: 24px;
            margin-right: 12px;
        }
    }

    .table-search__r {
        width: 300px;
        text-align: right;
    }
</style>
