<template>
    <el-form :model="formData" :rules="rules" :label-width="formLabelWidth" label-position="left" require-asterisk-position="right" status-icon>
        <div class="gui-title__card">基本信息</div>

        <div class="ml-[12px]">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="区域">
                <el-select v-model="formData.region" placeholder="请选择区域">
                    <el-option label="上海" value="shanghai" />
                    <el-option label="北京" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="姓名2" prop="name2">
                <el-autocomplete v-model="formData.name2" :fetch-suggestions="querySearch" clearable placeholder="请输入姓名2" />
            </el-form-item>
            <el-form-item label="姓名3">
                <el-cascader v-model="formData.name3" :options="name3Options" />
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker v-model="formData.date" type="date" placeholder="请选择日期" />
            </el-form-item>
            <el-form-item label="日期时间">
                <el-date-picker v-model="formData.dateTime" type="datetime" placeholder="请选择日期时间" />
            </el-form-item>
            <el-form-item label="日期时间范围">
                <el-date-picker v-model="formData.dateTimeRange" type="datetimerange" :shortcuts="shortcuts" start-placeholder="Start date" end-placeholder="End date" />
            </el-form-item>
            <el-form-item label="数字">
                <el-input-number v-model="formData.num" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="数字2">
                <el-input-number v-model="formData.num2" :min="1" :max="10" controls-position="right" />
            </el-form-item>
            <el-form-item label="时间">
                <el-time-picker v-model="formData.time" placeholder="" />
            </el-form-item>
            <el-form-item label="时间范围">
                <el-time-picker v-model="formData.timeRange" placeholder="" is-range
                    arrow-control
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="formData.delivery" />
            </el-form-item>
            <el-form-item label="活动类型">
                <el-checkbox-group v-model="formData.type">
                    <el-checkbox value="线上活动" name="type"> 线上活动 </el-checkbox>
                    <el-checkbox value="促销活动" name="type"> 促销活动 </el-checkbox>
                    <el-checkbox value="线下活动" name="type"> 线下活动 </el-checkbox>
                    <el-checkbox value="简单品牌曝光" name="type"> 简单品牌曝光 </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="资源">
                <el-radio-group v-model="formData.resource">
                    <el-radio value="Sponsor">赞助商</el-radio>
                    <el-radio value="Venue">场地</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
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
        resource: 'Sponsor',
        desc: '',
        name2: '',
        name3: '',
        date: '',
        dateTime: '',
        dateTimeRange: [],
        num: 1,
        num2: 1,
        time: '',
        timeRange: []
    }
    // 表单验证
    const validationRules = reactive({
        name: createRules({
            required: true,
            label: '姓名'
        }),
        name2: createRules({
            required: true,
            label: '姓名2'
        })
    })

    const { formRef, formData, rules, formLabelWidth, resetForm, submitForm } = useForm(initialForm, validationRules)

    const querySearch = (queryString, cb) => {
        const results = queryString ? cities.filter(createFilter(queryString)) : cities
    }

    const name3Options = [
        {
            value: '1',
            label: '选项1',
            children: []
        }
    ]

    const shortcuts = [
        {
            text: '最近7天',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setDate(start.getDate() - 7)
                return [start, end]
            }
        },
        {
            text: '最近30天',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 1)
                return [start, end]
            }
        },
        {
            text: '最近90天',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 3)
                return [start, end]
            }
        }
    ]
</script>

<style scoped lang="scss"></style>
