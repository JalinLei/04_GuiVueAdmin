<!--------------------------------
 - @Desc: 系统管理——角色管理
 - @Author: Jalin
 --------------------------------->

<script setup lang="jsx">
import { reactive, ref, onMounted } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { GuiProTable } from '@/components'
import {Api_Common_Role_GetRoleList, Api_Common_Role_Delete} from '@/api/common/role'
import { UtilsDatetime, UtilsArray } from '@/utils'
import { DialogSysTemRoleAddEdit } from '@/dialog/system'
import { useHandleData } from '@/hooks'

defineOptions({
    name: 'SystemRole'
})
// GuiProTable 实例
const GuiProTableRef = ref()
const DialogAddEditRef = ref()
const roleStateEnums = ref([
    {value: 1, label: '正常', type: 'primary'},
    {value: 0, label: '禁用', type: 'danger'}
])

// 表格配置项
const columns = reactive([
    {
        prop: 'name',
        label: '角色名称',
        minWidth: 200,
        search: { el: 'input', key: 'name' }
    },
    {
        prop: 'state',
        label: '角色状态',
        minWidth: 120,
        enum: roleStateEnums.value,
        search: { el: 'select', key: 'state' },
        render: (scope) => {
            return (
                <el-tag type={UtilsArray.getEnumLabel(roleStateEnums.value, scope.row?.state, 'value', 'type')}>
                    {UtilsArray.getEnumLabel(roleStateEnums.value, scope.row?.state)}
                </el-tag>
            )
        }
    },
    {
        prop: 'remark',
        label: '备注',
        minWidth: 200
    },
    {
        prop: 'createTime',
        label: '创建时间',
        minWidth: 200,
        /*render: (scope) => {
            return UtilsDatetime.formatDateTime(scope.row.createTime)
        }*/
    },
    { prop: 'operation', label: '操作', fixed: 'right', minWidth: 100 }
])
const getTableList = (params) => {
    return Api_Common_Role_GetRoleList({
        userName: params.userName || '',
        pageIndex: params.pageNum,
        pageSize: params.pageSize,
        startTime: '',
        endTime: '',
        state: params.state,
        sort: [
            {
                field: "",
                direct: ""
            }
        ],
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
        title: '编辑角色',
        modalType: 'edit',
        formData: row
    })
}
const handleAdd = () => {
    DialogAddEditRef.value?.openModal({
        title: '新建角色',
        modalType: 'add',
    })
}

const handleDelete = async (params) => {
    await useHandleData(Api_Common_Role_Delete, [params.id], `删除【${params.name}】角色`)
    GuiProTableRef.value?.getTableList()
}

const refreshTable = () => {
    GuiProTableRef.value?.getTableList()
}

onMounted(() => {})
</script>

<template>
    <div class="gui-system-user gui-pro-table">
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

        <DialogSysTemRoleAddEdit ref="DialogAddEditRef" @confirm="refreshTable" />
    </div>
</template>

<style scoped lang="scss"></style>

