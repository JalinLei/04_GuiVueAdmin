/**********************************
 * @Desc: 表单的通用逻辑
 * @Author:  Jalin
 **********************************/

import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export function useForm(initFormData = {}, validationRules) {
    const formRef = ref(null) // el-form 的引用
    const formData = ref({ ...initFormData }) // 表单数据
    const rules = ref(validationRules) // 表单校验规则
    const formLabelWidth = ref('150px') // 表单校验规则

    // 重置表单
    const resetForm = () => {
        if (formRef.value) {
            formRef.value.resetFields()
        }
        Object.assign(formData.value, { ...initFormData })
    }

    // 提交表单
    const submitForm = async (callback) => {
        if (formRef.value) {
            try {
                await formRef.value.validate()
                callback && callback(formData.value) // 调用用户传入的回调函数
            } catch (error) {
                return false
                // ElMessage.error('请检查表单输入')
            }
        }
    }
    // 手动校验某一字段
    const validateField = async (field) => {
        if (formRef.value) {
            try {
                await formRef.value.validateField(field)
                ElMessage.success(`${field} 校验成功`)
            } catch (error) {
                ElMessage.error(error.message || `${field} 校验失败`)
            }
        }
    }

    return {
        formRef,
        formData,
        rules,
        formLabelWidth,
        resetForm,
        submitForm,
        validateField
    }
}
