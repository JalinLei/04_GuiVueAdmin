<template>
    <el-form :model="formData" :rules="rules" :label-width="formLabelWidth" label-position="left" require-asterisk-position="right" status-icon>
        <div class="gui-title__card">基本信息</div>

        <div class="ml-[12px]">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="区域">
                <el-select v-model="formData.region" placeholder="请选择区域">
                    <el-option label="上海" value="shanghai" />
                    <el-option label="北京" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                    <el-date-picker v-model="formData.date1" type="date" placeholder="请选择日期" style="width: 100%">
                        <template #prev-year="slotProps"></template>
                    </el-date-picker>
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-time-picker v-model="formData.date2" placeholder="请选择时间" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="formData.delivery" />
            </el-form-item>
            <el-form-item label="活动类型">
                <el-checkbox-group v-model="formData.type">
                    <el-checkbox value="Online activities" name="type"> Online activities </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type"> Promotion activities </el-checkbox>
                    <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type"> Simple brand exposure </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="资源">
                <el-radio-group v-model="formData.resource">
                    <el-radio value="Sponsor">Sponsor</el-radio>
                    <el-radio value="Venue">Venue</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input v-model="formData.desc" type="textarea" />
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup>
    import { reactive } from 'vue'
    import { useForm, useValidationRules } from '@/hooks'

    const { createRules, patterns } = useValidationRules()

    const initialForm = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
    }
    // 表单验证
    const validationRules = reactive({
        name: createRules({
            required: true,
            label: '姓名'
        })
    })

    const { formRef, formData, rules, formLabelWidth, resetForm, submitForm } = useForm(initialForm, validationRules)
</script>

<style scoped lang="scss"></style>
