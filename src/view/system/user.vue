<!--------------------------------
 - @Desc: 系统管理——用户管理
 - @Author: Jalin
 --------------------------------->

<script setup lang="jsx">
import { reactive, ref, onMounted } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { GuiProTable } from '@/components'
import {Api_Common_User_GetList, Api_Common_User_Delete} from '@/api/common/user'
import {UtilsArray, UtilsDatetime} from '@/utils'
import { DialogSysTemUserAddEdit } from '@/dialog/system'
import {useHandleData} from "@/hooks";

defineOptions({
    name: 'SystemUser'
})
// GuiProTable 实例
const GuiProTableRef = ref()
const DialogAddEditRef = ref()
const userStateEnums = ref([
    {value: 1, label: '启用', type: 'primary'},
    {value: 0, label: '禁用', type: 'danger'}
])

// 表格配置项
const columns = reactive([
    // { type: 'selection', fixed: 'left', width: 70 },
    {
        prop: 'userName',
        label: '用户名称',
        minWidth: 200,
        search: { el: 'input', key: 'userName' }
    },
    {
        prop: 'status',
        label: '状态',
        minWidth: 120,
        enum: userStateEnums.value,
        search: { el: 'select', key: 'state' },
        render: (scope) => {
            return (
                <el-tag size="mini" type={UtilsArray.getEnumLabel(userStateEnums.value, scope.row?.state, 'value', 'type')}>
                    {UtilsArray.getEnumLabel(userStateEnums.value, scope.row?.state)}
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
    return Api_Common_User_GetList({
        userName: params.userName || '',
        pageIndex: params.pageNum,
        pageSize: params.pageSize,
        startTime: '',
        endTime: '',
        state: params.state,
        sort: [
            {
                "field": "",
                "direct": ""
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
        title: '编辑用户',
        modalType: 'edit',
        formData: row
    })
}

const handleAdd = () => {
    DialogAddEditRef.value?.openModal({
        title: '新建用户',
        modalType: 'add',
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
    <div class="h-full gui-system-user">
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
