<!--------------------------------
 - @Desc: 【对话框】 用户管理——添加、编辑
 - @Author: Jalin
 --------------------------------->

<script setup name="DialogSysTemUserAddEdit">
import { GuiDialog } from '@/components'
import { reactive, ref, computed } from 'vue'
import { useForm } from '@/hooks/modules/useForm'
import { UtilsFile } from '@/utils'
import _ from 'lodash'
import {Api_Common_User_Add, Api_Common_User_Update, Api_Common_User_GetRoleList} from '@/api/common/user'

// 声明允许触发的事件
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps({})

const initialForm = {
    userName: '',
    password: '',
    state: 1,
    remark: '',
    roleIds: []
}
// 表单验证
const validationRules = reactive({
    userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    state: [{ required: true, message: '请选择角色状态', trigger: 'change' }]
})

const { formRef, formData, rules, formLabelWidth, resetForm, submitForm } = useForm(initialForm, validationRules)

// 声明一个modalOptions变量，用于存储模态框的配置信息
const modalOptions = ref({})
const modalRef = ref('')
// 区分当前打开的对话框类型(新增\编辑)
const modalType = computed(() => {
    return modalOptions.value.modalType
})
const roleEnums = ref([])

const getRoleEnums = async () => {
    let {suc, data} = await Api_Common_User_GetRoleList()
    if (suc) {
        roleEnums.value = data || []
    }
}

// 新增提交
const submitAdd = async () => {
    let isPass = false
    await new Promise((resolve) => {
        submitForm(async (data) => {
            let params = {
                "userName": data.userName,
                "password": data.password,
                "state": data.state,
                "remark": data.remark,
                "roleIds": data.roleIds
            }
            let {suc} = await Api_Common_User_Add(params)


            if (suc) {
                emit('confirm')
                isPass = true
            }
            // 确保所有操作完成后执行 resolve
            resolve()
        })
    })
    return isPass
}

// 扩容提交
const submitEdit = async () => {
    let isPass = false
    await new Promise((resolve) => {
        submitForm(async (data) => {
            let params = {
                "id": data.id,
                "userName": data.userName,
                "password": data.password,
                "state": data.state,
                "remark": data.remark,
                "roleIds": data.roleIds
            }
            let {suc} = await Api_Common_User_Update(params)
            if (suc) {
                emit('confirm')
                isPass = true
            }
            // 确保所有操作完成后执行 resolve
            resolve()
        })
    })
    return isPass
}

// 打开上传系统镜像对话框
const openModal = (options = {}) => {
    // 将props和options合并赋值给modalOptions
    modalOptions.value = { ...props, ...options }

    if (modalType.value === 'edit') {
        let roles = _.cloneDeep(options.formData.roles);
        let roleIds = roles.map((item) => {
            return item.id
        })
        formData.value = {
            ...options.formData,
            roleIds: roleIds,
        }
    }

    modalRef.value.open({
        title: modalOptions.value.title,
        async onOk() {
            if (modalType.value === 'add') {
                return submitAdd()
            }

            if (modalType.value === 'edit') {
                return submitEdit()
            }
        }
    })
}

const closed = () => {
    resetForm()
    emit('cancel')
}
const opened = () => {
    // getRoleEnums()
}

defineExpose({
    openModal,
    options: modalOptions
})
</script>

<template>
    <GuiDialog ref="modalRef" @closed="closed" @opened="opened">
        <el-form ref="formRef" :model="formData" :rules="rules" :label-width="formLabelWidth" status-icon>
            <el-form-item label="用户名称" prop="userName">
                <el-input v-model="formData.userName" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" show-password v-model="formData.password" />
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-radio-group v-model="formData.state">
                    <el-radio :value="1">启用</el-radio>
                    <el-radio :value="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="角色权限" prop="roleIds">
                <el-select
                    v-model="formData.roleIds"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder=""
                >
                    <el-option v-for="item in roleEnums" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="formData.remark" placeholder="" />
            </el-form-item>
        </el-form>
    </GuiDialog>
</template>

<style scoped lang="scss"></style>
