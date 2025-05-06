<template>
    <el-dialog
        :style="{ ...modalOptions.modalStyle }"
        v-model="visible"
        :width="modalOptions.width"
        :class="`gui-dialog ${dialogProps.customClass || ''}`"
        v-bind="{
            ...dialogProps,
            draggable: (dialogProps.draggable!==false),
            appendToBody: (dialogProps.appendToBody!==false)
        }">
        <template #header>
            <header class="gui-dialog__header">
                {{ modalOptions.title }}
            </header>
        </template>

        <!-- 对话框注释 -->
        <div class="gui-dialog__notes" v-if="hasNotesSlot && modalOptions.showNotesSlot">
            <el-alert type="info" show-icon :closable="false">
                <slot name="notes"></slot>
            </el-alert>
        </div>

        <!-- 默认对话框内容 -->
        <div class="gui-dialog__body">
            <slot />
        </div>

        <!-- 底部按钮 -->
        <template #footer v-if="modalOptions.showFooter">
            <el-button v-if="modalOptions.showCancel" @click="handleCancel()">
                {{ modalOptions.cancelText }}
            </el-button>
            <el-button v-if="modalOptions.showOk" type="primary" :loading="modalOptions.okLoading" @click="handleOk()">
                {{ modalOptions.okText }}
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
    import { ref, computed, nextTick, useSlots } from 'vue'

    const slots = useSlots()
    const props = defineProps({
        width: {
            type: String,
            default: '560px'
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        okText: {
            type: String,
            default: '确定'
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        showOk: {
            type: Boolean,
            default: true
        },
        modalStyle: {
            type: Object,
            default: () => {
            }
        },
        contentStyle: {
            type: Object,
            default: () => {
            }
        },
        onOk: {
            type: Function,
            default: () => {
            }
        },
        onCancel: {
            type: Function,
            default: () => {
            }
        },
        // 动态绑定所有传入的 el-dialog 属性
        dialogProps: {
            type: Object,
            default: () => ({})
        },
        // 控制是否显示注释插槽
        showNotesSlot: {
            type: Boolean,
            default: true
        }
    })

    // 判断是否有注释插槽
    const hasNotesSlot = !!slots.notes
    // 声明一个dialogVisible 变量，用于控制模态框的显示与隐藏
    const visible = ref(false)
    // 声明一个modalOptions变量，用于存储模态框的配置信息
    const modalOptions = ref({})

    const okLoading = computed({
        get() {
            return !!modalOptions.value?.okLoading
        },
        set(v) {
            if (modalOptions.value) {
                modalOptions.value.okLoading = v
            }
        }
    })

    // 打开模态框
    async function open(options = {}) {
        // 将props和options合并赋值给modalOptions
        modalOptions.value = { ...props, ...options }

        // 将show的值设置为true
        visible.value = true

        await nextTick()
    }

    // 定义一个close函数，用于关闭模态框
    function close() {
        visible.value = false
    }

    // 定义一个handleOk函数，用于处理模态框确定操作
    async function handleOk(data) {
        // 如果modalOptions中没有onOk函数，则直接关闭模态框
        if (typeof modalOptions.value.onOk !== 'function') {
            return close()
        }
        try {
            // 调用onOk函数，传入data参数
            const res = await modalOptions.value.onOk(data)

            // 如果onOk函数的返回值不为false，则关闭模态框
            if (res !== false)
                close()
        } catch (error) {
            console.error(error)
            okLoading.value = false
        }
    }

    // 定义一个handleCancel函数，用于处理模态框取消操作
    async function handleCancel(data) {
        // 如果modalOptions中没有onCancel函数，则直接关闭模态框
        if (typeof modalOptions.value.onCancel !== 'function') {
            return close()
        }
        try {
            // 调用onCancel函数，传入data参数
            const res = await modalOptions.value.onCancel(data)

            // 如果onCancel函数的返回值不为false，则关闭模态框
            if (res !== false)
                close()
        } catch (error) {
            console.error(error)
            okLoading.value = false
        }
    }


    // 定义一个defineExpose函数，用于暴露open、close、handleOk、handleCancel函数
    defineExpose({
        open,
        close,
        handleOk,
        handleCancel,
        okLoading,
        options: modalOptions
    })
</script>

<style lang="scss">
    ::v-deep(.el-dialog) {
        padding: 0;
    }
</style>
