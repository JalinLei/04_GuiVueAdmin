<!--------------------------------
 - @Desc: 【对话框】 单元管理——新增、编辑
 - @Author: Jalin
 --------------------------------->

<script setup name="DialogUnitAddEdit">
    import { GuiDialog } from '@/components'
    import { reactive, ref } from 'vue'
    import { useForm, useValidationRules } from '@/hooks'
    import { Api_Unit_Add, Api_Unit_Update } from '@/api/unit'
    import { ElMessage, genFileId } from 'element-plus'
    import _ from 'lodash'

    // 声明允许触发的事件
    const emit = defineEmits(['confirm', 'cancel'])
    const props = defineProps({})
    const { createRules } = useValidationRules()

    const initialForm = {
        unitName: '',
        unitType: null,
        unitExplanation: '',
        unitParameter: '',
        filePath: '',
        fileContentMD5: '',
        unitVersion: '',
        isTaskChunking: true,
        isEnable: true
    }

    // 表单验证
    const validationRules = reactive({
        unitName: createRules({
            required: true,
            label: '单元名称'
        }),
        unitType: createRules({
            required: true,
            label: '单元类型'
        }),
        unitExplanation: createRules({
            required: true,
            label: '单元说明'
        }),
        unitVersion: createRules({
            required: true,
            label: '单元版本'
        }),
        isTaskChunking: createRules({
            required: true,
            label: '是否任务分片'
        }),
        isEnable: createRules({
            required: true,
            label: '是否启用'
        }),
        filePath: (required) => createRules({
            required: required,
            label: '单元上传'
        }),
        unitParameter: createRules({
            required: true,
            label: '单元参数',
            validator: [
                (rule, value, callback) => {
                    if (typeof value !== 'string' || value.trim() === '') {
                        callback(new Error('单元参数为空'))
                    } else {
                        try {
                            const parsedValue = JSON.parse(value) // 尝试解析 JSON
                            if (typeof parsedValue !== 'object' || parsedValue === null) {
                                throw new Error() // 解析成功但不是对象
                            }
                            callback() // 解析成功且是对象
                        } catch (e) {
                            callback(new Error('单元参数格式错误'))
                        }
                    }
                }
            ]
        })
    })

    const { formRef, formData, rules, formLabelWidth, resetForm, submitForm } = useForm(initialForm, validationRules)


    // 声明一个modalOptions变量，用于存储模态框的配置信息
    const modalOptions = ref({})
    const modalRef = ref('')
    // 区别对话框类型（新增、编辑）
    const modalType = ref('')
    const UploadRef = ref()
    const uploadFileList = ref([])
    const uploadChange = (uploadFile, uploadFiles) => {
        formData.value.filePath = uploadFile.name
    }
    const uploadExceed = (files) => {
        UploadRef.value?.clearFiles()
        const file = files[0]
        file.uid = genFileId()
        UploadRef.value?.handleStart(file)
    }
    const submit = async () => {
        let isPass = false
        await new Promise((resolve) => {
            submitForm(async (data) => {
                let res = null
                const formDataObj = new FormData()
                formDataObj.append('unitName', data.unitName)
                formDataObj.append('unitType', data.unitType)
                formDataObj.append('unitExplanation', data.unitExplanation)
                formDataObj.append('unitParameter', data.unitParameter)
                formDataObj.append('unitVersion', data.unitVersion)
                formDataObj.append('isTaskChunking', data.isTaskChunking)
                formDataObj.append('isEnable', data.isEnable)

                if (uploadFileList.value.length > 0) {
                    formDataObj.append('file', uploadFileList.value[0].raw)
                } else {
                    ElMessage.error('请上传文件')
                    return
                }

                if (modalType.value === 'add') {
                    res = await Api_Unit_Add(formDataObj)
                }

                if (modalType.value === 'edit') {
                    formDataObj.append('id', data.id)
                    res = await Api_Unit_Update(formDataObj)
                }

                if (res?.suc) {
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
        modalType.value = modalOptions.value.modalType
        if (modalType.value === 'edit') {
            formData.value = _.cloneDeep(options.formData)

            if (options.formData?.filePath) {
                // 回填一下上传文件显示
                const fileName = options.formData?.filePath.split('\\').pop()
                uploadFileList.value = [
                    {
                        name: fileName,
                        url: options.formData?.filePath
                    }
                ]
            }
        }
        modalRef.value.open({
            title: modalOptions.value.title,
            async onOk() {
                return submit()
            }
        })
    }

    const closed = () => {
        resetForm()
        uploadFileList.value = []
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
            <el-form-item label="单元名称" prop="unitName">
                <el-input v-model="formData.unitName" placeholder="请输入单元名称" />
            </el-form-item>
            <el-form-item label="单元类型" prop="unitType">
                <el-select v-model="formData.unitType" placeholder="请选择单元类型">
                    <el-option v-for="item in modalOptions.unitTypeEnums" :key="item.value" :label="item.label"
                               :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="单元说明" prop="unitExplanation">
                <el-input v-model="formData.unitExplanation" type="textarea" placeholder="请输入单元说明" />
            </el-form-item>
            <el-form-item label="单元参数" prop="unitParameter">
                <el-input v-model="formData.unitParameter" type="textarea" placeholder="单元参数描述Json" />
            </el-form-item>
            <el-form-item label="单元上传" prop="filePath" :rules="rules.filePath(modalType === 'add')">
                <el-upload
                    ref="UploadRef"
                    v-model:file-list="uploadFileList"
                    action="#"
                    :auto-upload="false"
                    style="width: 100%"
                    :limit="1"
                    :on-exceed="uploadExceed"
                    :on-change="uploadChange">
                    <template #trigger>
                        <el-button type="primary">点击上传</el-button>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="单元版本" prop="unitVersion">
                <el-input v-model="formData.unitVersion" placeholder="请输入单元版本" />
            </el-form-item>
            <el-form-item label="是否任务分片" prop="isTaskChunking">
                <el-radio-group v-model="formData.isTaskChunking">
                    <el-radio :value="true">是</el-radio>
                    <el-radio :value="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否启用" prop="isEnable">
                <el-radio-group v-model="formData.isEnable">
                    <el-radio :value="true">是</el-radio>
                    <el-radio :value="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </GuiDialog>
</template>

<style scoped lang="scss"></style>
