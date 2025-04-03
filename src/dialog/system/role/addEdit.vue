<!--------------------------------
 - @Desc: 【对话框】 角色管理——添加、编辑
 - @Author: Jalin
 --------------------------------->

<script setup name="DialogSysTemRoleAddEdit">
    import { GuiDialog } from '@/components'
    import { reactive, ref, computed } from 'vue'
    import { useForm } from '@/hooks/modules/useForm'
    import { UtilsFile } from '@/utils'
    import _ from 'lodash'
    import {Api_Common_Role_GetMenuList, Api_Common_Role_Add, Api_Common_Role_Update} from '@/api/common/role'

    // 声明允许触发的事件
    const emit = defineEmits(['confirm', 'cancel'])
    const props = defineProps({})

    const initialForm = {
        name: '',
        state: 1,
        remark: '',
        menuIds: []
    }
    // 表单验证
    const validationRules = reactive({
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
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
    const menuEnums = ref([])

    const getMenuList = async () => {
        let {suc, data} = await Api_Common_Role_GetMenuList()
        if (suc) {
            menuEnums.value = data || [];
        }
    }

    // 新增提交
    const submitAdd = async () => {
        let isPass = false
        await new Promise((resolve) => {
            submitForm(async (data) => {
                let params = {
                    "name": data.name,
                    "state": data.state,
                    "remark": data.remark,
                    "menuIds": data.menuIds
                }
                let {suc} = await Api_Common_Role_Add(params)
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

    // 编辑提交
    const submitEdit = async () => {
        let isPass = false
        await new Promise((resolve) => {
            submitForm(async (data) => {
                let params = {
                    "id": data.id,
                    "name": data.name,
                    "state": data.state,
                    "remark": data.remark,
                    "menuIds": data.menuIds
                }
                let {suc} = await Api_Common_Role_Update(params)
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

    // 打开对话框
    const openModal = (options = {}) => {
        // 将props和options合并赋值给modalOptions
        modalOptions.value = { ...props, ...options }

        if (modalType.value === 'edit') {
            let menus = _.cloneDeep(options.formData.menus);
            let menuIds = menus.map((item) => {
                return item.id
            })
            formData.value = {
                ...options.formData,
                menuIds: menuIds,
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
        getMenuList()
    }

    defineExpose({
        openModal,
        options: modalOptions
    })
</script>

<template>
    <GuiDialog ref="modalRef" @closed="closed" @opened="opened">
        <el-form ref="formRef" :model="formData" :rules="rules" :label-width="formLabelWidth" status-icon>
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="角色状态" prop="state">
                <el-radio-group v-model="formData.state">
                    <el-radio :value="1">正常</el-radio>
                    <el-radio :value="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单权限" prop="menuIds">
                <el-tree-select
                    v-model="formData.menuIds"
                    :data="menuEnums"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    :render-after-expand="false"
                    show-checkbox
                    check-strictly
                    check-on-click-node
                    value-key="id"
                    :props="{
                        label: node => node.meta?.title || '',
                        value: 'id',
                        children: 'children'
                    }"
                />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="formData.remark" placeholder="" />
            </el-form-item>
        </el-form>
    </GuiDialog>
</template>

<style scoped lang="scss"></style>
