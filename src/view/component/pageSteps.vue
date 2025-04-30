<template>
    <div class="vvw vvh bg-white shadow">
        <gui-page-steps :active="stepActive" :steps-data="['步骤一', '步骤二', '步骤三']">
            <template v-slot:default>
                <div v-show="stepActive === 0">
                    <stepOneForm />
                </div>

                <div v-show="stepActive === 1">
                    第二步操作
                </div>

                <div v-show="stepActive === 2">
                    第三步操作
                </div>
            </template>

            <template v-slot:footer>
                <template v-if="stepActive === 0">
                    <el-button type="primary" @click="stepActive++">下一步</el-button>
                </template>

                <template v-if="stepActive === 1">
                    <el-button @click="stepActive--">上一步</el-button>
                    <el-button type="primary" @click="stepActive++">下一步</el-button>
                </template>

                <template v-if="stepActive === 2">
                    <el-button @click="stepActive--">上一步</el-button>
                    <el-button type="primary" @click="submit">完成</el-button>
                </template>
            </template>
        </gui-page-steps>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { GuiPageSteps } from '@/components'
    import { ElMessage } from 'element-plus'
    import stepOneForm from './components/form.vue'

    defineOptions({
        name: 'ComponentPageSteps'
    })

    const stepActive = ref(0)
    const submit = () => {
        ElMessage.success('成功！')
    }
</script>

<style lang="scss" scoped></style>
