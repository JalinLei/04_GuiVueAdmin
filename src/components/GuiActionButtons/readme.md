# GuiActionButtons 按钮组

适用于表格操作栏。

## 使用

```vue
<template>
    <div>
        <!-- 方式一 -->
        <GuiActionButtons :buttons="[
            { label: '详情', onClick: () => handleDetail(scope.row) },
            { label: scope.row.isEnable ? '停用' : '启用', onClick: () => handleSetEnable(scope.row) },
            { label: '编辑', onClick: () => handleAddEdit('edit', scope.row) },
            { label: '下载', onClick: () => handleDownload(scope.row.id) },
            { label: '删除', onClick: () => handleDelete('single', scope.row) }
        ]" />

        <!-- 方式二 -->
        <GuiActionButtons :buttons="[
            { label: '详情', onClick: () => handleDetail(scope.row) },
            { label: scope.row.isEnable ? '停用' : '启用', onClick: () => handleSetEnable(scope.row) },
        ]">
            <template #btn-edit>
                <el-button type="primary" link @click="handleAddEdit(scope.row)">编辑</el-button>
            </template>

            <template #btn-download>
                <el-button type="primary" link @click="handleDownload(scope.row.id)">下载</el-button>
            </template>

            <template #btn-delete>
                <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </GuiActionButtons>

        <!-- 方式三 -->
        <GuiActionButtons>
            <template #btn-detail>
                <el-button type="primary" link @click="handleDetail(scope.row)">详情</el-button>
            </template>
            <template #btn-isEnable>
                <el-button type="primary" link @click="handleSetEnable(scope.row)">{{scope.row.isEnable ? '停用' : '启用'}}</el-button>
            </template>
            <template #btn-edit>
                <el-button type="primary" link @click="handleAddEdit(scope.row)">编辑</el-button>
            </template>
            <template #btn-download>
                <el-button type="primary" link @click="handleDownload(scope.row.id)">下载</el-button>
            </template>
            <template #btn-delete>
                <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </GuiActionButtons>
    </div>
</template>

<script setup>
    import { GuiActionButtons } from '@/components'
</script>
```
