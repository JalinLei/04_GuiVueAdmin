<script setup>
    import { ref, computed } from 'vue'
    import { GuiDrawer } from '@/components'
    import { UtilsArray, UtilsDatetime, UtilsFile } from '@/utils'
    import { Api_Task_GetTaskInfoDetail } from '@/api/task'

    const drawerVisible = ref(false)
    const drawerOptions = ref({})
    const props = defineProps({})

    // 获取任务详情数据
    const getDetailInfo = async (taskId) => {
        let { suc, data } = await Api_Task_GetTaskInfoDetail({ taskId })

        if (suc) {
            drawerOptions.value.formData = data || {}
        }
    }

    // 打开抽屉
    const openDrawer = (options = {}) => {
        drawerOptions.value = { ...props, ...options }
        getDetailInfo(options.formData.taskId)
        drawerVisible.value = true
    }

    defineExpose({
        openDrawer,
        options: drawerOptions
    })

    // 计算属性生成详情数组
    const details = computed(() => [
        { label: '任务名称', value: drawerOptions.value?.formData?.name, bold: true },
        {
            label: '任务类型',
            value: UtilsArray.getEnumLabel(drawerOptions.value.taskTypeEnums, drawerOptions.value.formData?.taskType),
            text: true,
            tagType: UtilsArray.getEnumLabel(drawerOptions.value.taskTypeEnums, drawerOptions.value.formData?.taskType, 'value', 'type')
        },
        { label: '用户', value: drawerOptions.value?.formData?.createUserId },
        {
            label: '任务状态',
            value: UtilsArray.getEnumLabel(drawerOptions.value.taskStateEnums, drawerOptions.value.formData?.state),
            tag: true,
            tagType: UtilsArray.getEnumLabel(drawerOptions.value.taskStateEnums, drawerOptions.value.formData?.state, 'value', 'type')
        },
        { label: '任务进度', value: drawerOptions.value?.formData?.progress },
        {
            label: '任务优先级',
            value: UtilsArray.getEnumLabel(drawerOptions.value.taskPriorityEnums, drawerOptions.value.formData?.priority),
            tag: true,
            tagType: UtilsArray.getEnumLabel(drawerOptions.value.taskPriorityEnums, drawerOptions.value.formData?.priority, 'value', 'type')
        },
        { label: '任务创建时间', value: UtilsDatetime.formatDateTime(drawerOptions.value?.formData?.createTime) },
        { label: '开始执行时间', value: UtilsDatetime.formatDateTime(drawerOptions.value?.formData?.bingTime) },
        { label: '任务结束时间', value: UtilsDatetime.formatDateTime(drawerOptions.value?.formData?.endTime) },
        { label: '任务计划开始时间', value: UtilsDatetime.formatDateTime(drawerOptions.value?.formData?.planBingTime) },
        /*{
            label: '任务切片状态',
            value: UtilsArray.getEnumLabel(drawerOptions.value.taskSliceStateEnums, drawerOptions.value.formData?.taskSliceState),
            tag: true,
            tagType: UtilsArray.getEnumLabel(drawerOptions.value.taskSliceStateEnums, drawerOptions.value.formData?.taskSliceState, 'value', 'type')
        },*/
        { label: '节点IP', value: drawerOptions.value?.formData?.nodeIps?.join(',') },
        { label: '目标文件', value: drawerOptions.value?.formData?.targetPath },
        'divider',
        { label: '载荷名称', value: drawerOptions.value?.formData?.payloadName },
        { label: '载荷MD5', value: drawerOptions.value?.formData?.payloadMd5 },
        { label: '载荷参数', value: drawerOptions.value?.formData?.payloadArgsStr }
    ])
</script>

<template>
    <GuiDrawer v-model="drawerVisible" :title="drawerOptions.title" width="450px">
        <div class="details-container">
            <template v-for="(item, index) in details" :key="index">
                <el-divider v-if="item === 'divider'" />
                <div v-else class="detail-item">
                    <span class="detail-label">{{ item.label }}</span>
                    <span class="detail-value" :style="{ fontWeight: item.bold ? 'bold' : 'normal' }">
                        <el-tag v-if="item.tag && item.value" :type="item.tagType">{{ item.value }}</el-tag>
                        <el-text v-else-if="item.text && item.value" :type="item.tagType">{{ item.value }}</el-text>
                        <span v-else>{{ item.value }}</span>
                    </span>
                </div>
            </template>
        </div>
    </GuiDrawer>
</template>

<style scoped lang="scss">
    .detail-item {
        display: flex;
        justify-content: space-between;
        line-height: 32px;
    }

    .detail-label {
        width: 200px;
        opacity: 0.8;
    }

    .detail-value {
        text-align: left;
        width: calc(100% - 200px);
        word-break: break-word;
        white-space: normal;
    }
</style>
