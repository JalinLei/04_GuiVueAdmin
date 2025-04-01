<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    title: { type: String, default: '标题' },
    width: { type: String, default: '40%' },
    showClose: { type: Boolean, default: true },
    direction: { type: String, default: 'rtl' },
    modal: { type: Boolean, default: true },
    modalClass: String,
    appendToBody: Boolean,
    beforeClose: Function,
    closeOnClickModal: { type: Boolean, default: false },
    closeOnPressEscape: { type: Boolean, default: true },
    destroyOnClose: Boolean,
    customClass: String,
    openDelay: Number,
    closeDelay: Number,
    zIndex: Number,
    lockScroll: { type: Boolean, default: true },
    withHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'close']);
const handleClose = () => {
    emit('update:modelValue', false);
    emit('close');
};
</script>

<template>
    <el-drawer
        :model-value="modelValue"
        :title="title"
        :size="width"
        :show-close="showClose"
        :direction="direction"
        :modal="modal"
        :modal-class="modalClass"
        :append-to-body="appendToBody"
        :before-close="beforeClose"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :destroy-on-close="destroyOnClose"
        :custom-class="customClass"
        :open-delay="openDelay"
        :close-delay="closeDelay"
        :z-index="zIndex"
        :lock-scroll="lockScroll"
        :with-header="withHeader"
        @update:modelValue="$emit('update:modelValue', $event)"
        @close="handleClose"
    >
        <slot></slot>
        <template v-if="showFooter">
            <div class="drawer-footer">
                <slot name="footer"></slot>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
.drawer-footer {
    padding: 16px;
    border-top: 1px solid #ebeef5;
    text-align: right;
}
</style>
