<!--------------------------------
 - @Desc: 【对话框】 备注
 - @Author: Jalin
 --------------------------------->

<script setup name="DialogCommonRemark">
import {GuiDialog} from '@/components'
import {reactive, ref} from 'vue'
import {useForm} from '@/hooks/modules/useForm'
import {ElMessage} from 'element-plus'

// 声明允许触发的事件
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps({})

const initialForm = {
    remark: ''
}
// 表单验证
const validationRules = reactive({
    remark: [
        {required: true, message: '请输入备注', trigger: 'blur'}
    ]
})

const {formRef, formData, rules, formLabelWidth, resetForm, submitForm} = useForm(initialForm, validationRules)

// 声明一个modalOptions变量，用于存储模态框的配置信息
const modalOptions = ref({})
const modalRef = ref('')

const submit = async () => {
    let isPass = false
    await new Promise((resolve) => {
        submitForm(async (data) => {
            let params = {
                "remark": data.remark,
                ...modalOptions.value.apiParams
            }

            if (!modalOptions.value.apiMethod) {
                return ElMessage.warning('请传入接口方法！')
            }

            let {suc} = await modalOptions.value.apiMethod(params)
            if (suc) {
                ElMessage.success('设置成功！')
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
    modalOptions.value = {...props, ...options}

    modalRef.value.open({
        title: modalOptions.value.title,
        async onOk() {
            return submit()
        }
    })
}

const closed = () => {
    resetForm()
    emit('cancel')
}
const opened = () => {
}

defineExpose({
    openModal,
    options: modalOptions
})
</script>

<template>
    <GuiDialog ref="modalRef" @closed="closed" @opened="opened" class="gui-dialog__remark">
        <el-form ref="formRef" :model="formData" :rules="rules" :label-width="0" status-icon>
            <el-form-item prop="remark">
                <el-input  type="textarea" v-model="formData.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
    </GuiDialog>
</template>

<style lang="scss">
.gui-dialog.gui-dialog__remark {
    .el-form-item__content {
        width: 100% !important;

        .el-textarea__inner {
            height: 200px;
        }
    }
    .el-dialog__body {
        padding-bottom: 0 !important;
    }
}
</style>
