<!--------------------------------
 - @Desc: 组件——ProTable
 - @Author: Jalin
 --------------------------------->

<script setup lang="jsx">
    import { reactive, ref, onMounted } from 'vue'
    import { CirclePlus } from '@element-plus/icons-vue'
    import { GuiProTable } from '@/components'
    import { Api_Component_GetPageList } from '@/api/component'
    import { UtilsArray, UtilsDatetime } from '@/utils'
    import { DialogSysTemUserAddEdit } from '@/dialog/system'
    import { useHandleData } from '@/hooks'

    defineOptions({
        name: 'SystemUser'
    })
    // GuiProTable 实例
    const GuiProTableRef = ref()
    const DialogAddEditRef = ref()
    const userStateEnums = ref([
        { value: 1, label: '启用', type: 'primary' },
        { value: 0, label: '禁用', type: 'danger' }
    ])

    // 表格配置项
    const columns = reactive([
        {
            prop: 'name',
            label: '姓名',
            minWidth: 200,
            search: { el: 'input' }
        },
        {
            prop: 'phone',
            label: '手机号',
            minWidth: 200,
            search: { el: 'input' }
        },
        {
            prop: 'email',
            label: '邮箱',
            minWidth: 200,
            search: { el: 'input' }
        },
        {
            prop: 'address',
            label: '地址',
            minWidth: 200,
            search: { el: 'input' }
        },
        {
            prop: 'createTime',
            label: '创建时间',
            minWidth: 200,
            search: {
                el: 'date-picker',
                span: 1,
                props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
                defaultValue: ['', '']
            }
        },
        {
            prop: 'operation',
            label: '操作',
            fixed: 'right',
            minWidth: 100
        }
    ])
    const getTableList = (params) => {
        return Api_Component_GetPageList({
            userName: params.userName || '',
            pageIndex: params.pageNum,
            pageSize: params.pageSize,
            startTime: '',
            endTime: '',
            state: params.state,
            sort: [
                {
                    field: '',
                    direct: ''
                }
            ]
        })
    }
    const dataCallback = (data) => {
        return {
            ...data,
            list: data.rows,
            total: data.total
        }
    }
    const handleEdit = (row) => {
        DialogAddEditRef.value?.openModal({
            title: '编辑用户',
            modalType: 'edit',
            formData: row
        })
    }
    const handleAdd = () => {
        DialogAddEditRef.value?.openModal({
            title: '新建用户',
            modalType: 'add'
        })
    }

    const handleDelete = async (params) => {
        await useHandleData(Api_Common_User_Delete, [params.id], `删除【${params.userName}】用户`)
        GuiProTableRef.value?.getTableList()
    }

    const refreshTable = () => {
        GuiProTableRef.value?.getTableList()
    }

    onMounted(() => {})
</script>

<template>
    <div class="h-full">
        <GuiProTable ref="GuiProTableRef" :columns="columns" :request-api="getTableList" :init-param="{}" :data-callback="dataCallback" row-key="id">
            <!-- 表格 header 按钮 -->
            <template #tableHeader="scope">
                <el-button type="primary" :icon="CirclePlus" @click="handleAdd()">新建</el-button>
            </template>

            <!-- 表格操作 -->
            <template #operation="scope">
                <div style="display: flex">
                    <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
                </div>
            </template>
        </GuiProTable>

        <DialogSysTemUserAddEdit ref="DialogAddEditRef" @confirm="refreshTable" />
    </div>
</template>

<style scoped lang="scss"></style>
