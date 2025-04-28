<script setup>
    const props = defineProps({
        active: {
            type: Number,
            default: 0
        },
        stepsData: {
            type: Array,
            default: () => []
        },
        isShowFooter: {
            type: Boolean,
            default: true
        },
        isShowHeader: {
            type: Boolean,
            default: true
        }
    })
</script>

<template>
<div class="gui-page-steps h-full shadow-base bg-white">
    <template v-if="isShowHeader">
        <div class="px-[16px] page-steps__h h-[65px]">
            <div class="h-[calc(100%-1px)] flex items-center">
                <el-steps :active="active" simple class="gui-steps">
                    <el-step v-for="(stepItem, index) in stepsData" :title="stepItem" />
                </el-steps>
            </div>
            <el-divider></el-divider>
        </div>
    </template>

    <div class="page-steps__b h-[calc(100%-64px-64px-2px)] py-[16px]">
        <div class="page-steps__c h-full overflow-auto px-[16px]">
            <slot></slot>
        </div>
    </div>

    <template v-if="isShowFooter">
       <div class="h-[65px] px-[16px]">
           <el-divider></el-divider>
           <div class="h-[calc(100%-1px)] page-steps__f flex items-center">
               <slot name="footer"></slot>
           </div>
       </div>
    </template>
</div>
</template>

<style lang="scss">
    .gui-page-steps {
        .el-divider {
            margin: 0;
        }

        .el-steps.gui-steps {
            display: inline-flex;
            width: auto;
            padding: 0;
            border-radius: 0;
            background-color: transparent;

            .el-step {
                min-width: auto;
                margin-right: 40px;
            }

            .el-step:last-child {
                margin-right: 0;
            }

            .el-step.is-simple .el-step__icon {
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
                width: 28px;
                height: 28px;
            }

            .el-step.is-simple .el-step__arrow::before,
            .el-step.is-simple .el-step__arrow::after {
                height: 10px;
                width: 2px;
                opacity: 0.6;
            }
            .el-step.is-simple .el-step__arrow::after {
                transform: rotate(50deg) translateY(2px);
            }
            .el-step.is-simple .el-step__arrow::before {
                transform: rotate(-50deg) translateY(-2px);
            }

            .el-step.is-simple .el-step__title {
                margin-right: 35px;
                font-size: var(--el-font-size-base);
            }

            .el-step.is-simple:not(:last-of-type) .el-step__title {
                max-width: inherit;
                white-space: nowrap;
            }

            .el-step:nth-child(1) .el-step__head.is-wait .el-step__icon::before,
            .el-step:nth-child(1) .el-step__head.is-process .el-step__icon::before {
                content: "1";
            }

            .el-step:nth-child(2) .el-step__head.is-wait .el-step__icon::before,
            .el-step:nth-child(2) .el-step__head.is-process .el-step__icon::before {
                content: "2";
            }

            .el-step:nth-child(3) .el-step__head.is-wait .el-step__icon::before,
            .el-step:nth-child(3) .el-step__head.is-process .el-step__icon::before {
                content: "3";
            }

            .el-step:nth-child(4) .el-step__head.is-wait .el-step__icon::before,
            .el-step:nth-child(4) .el-step__head.is-process .el-step__icon::before {
                content: "4";
            }

            .el-step:nth-child(5) .el-step__head.is-wait .el-step__icon::before,
            .el-step:nth-child(5) .el-step__head.is-process .el-step__icon::before {
                content: "5";
            }

            .el-step:nth-child(6) .el-step__head.is-wait .el-step__icon::before,
            .el-step:nth-child(6) .el-step__head.is-process .el-step__icon::before {
                content: "6";
            }

            .el-step .el-step__head.is-finish .el-step__icon::before {
                content: "✔";
            }

            .el-step .el-step__head.is-finish .el-step__icon.is-text,
            .el-step .el-step__head.is-process .el-step__icon.is-text {
                background-color: var(--el-color-primary);
                color: var(--el-color-white);
                border-color: var(--el-color-primary);
            }
        }
    }
</style>
