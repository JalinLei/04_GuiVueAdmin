<!--------------------------------
 - @Desc: 【对话框】 节点管理——设置节点带宽
 - @Author: Jalin
 --------------------------------->

<script setup name="DialogNodeSettingBandwidth">
import {GuiDialog} from '@/components'
import {reactive, ref} from 'vue'
import {useForm} from '@/hooks/modules/useForm'
import {Api_Node_UpdateBandwidthById} from '@/api/node'
import {ElMessage} from 'element-plus'

// 声明允许触发的事件
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps({})

const initialForm = {
    bandwidth: null
}
// 表单验证
const validationRules = reactive({
    bandwidth: [
        {required: true, message: '请输入上行带宽', trigger: 'blur'}
    ]
})

const {formRef, formData, rules, formLabelWidth, resetForm, submitForm} = useForm(initialForm, validationRules)

// 声明一个modalOptions变量，用于存储模态框的配置信息
const modalOptions = ref({})
const modalRef = ref('')
const selectedListIds = ref([])

const submit = async () => {
    let isPass = false
    await new Promise((resolve) => {
        submitForm(async (data) => {
            let params = {
                "ids": selectedListIds.value,
                "bandwidth": data.bandwidth
            }
            let {suc} = await Api_Node_UpdateBandwidthById(params)
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

    selectedListIds.value = options.selectedListIds

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
    <GuiDialog ref="modalRef" @closed="closed" @opened="opened">
        <el-form ref="formRef" :model="formData" :rules="rules" :label-width="formLabelWidth" status-icon>
            <el-form-item label="上行带宽" prop="bandwidth">
                <el-input v-model="formData.bandwidth" placeholder="">
                    <template #append>Mbit/s</template>
                </el-input>
            </el-form-item>
        </el-form>
    </GuiDialog>
</template>

<style scoped lang="scss"></style>
