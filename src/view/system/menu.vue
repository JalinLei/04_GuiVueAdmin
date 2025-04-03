<!--------------------------------
 - @Desc: 系统管理——菜单管理
 - @Author: Jalin
 --------------------------------->

<template>
    <div class="h-full gui-system-user">
        <GuiProTable ref="GuiProTableRef"
                     :pagination="false"
                     :columns="columns"
                     :requestAuto="false"
                     :data="tableData"
                     row-key="id"
                     @refreshTable="getTableData">
            <!-- 表格 header 按钮 -->
            <template #tableHeader="scope">
                <el-button type="primary" :icon="CirclePlus" @click="addMenu(0)">新增根菜单</el-button>
            </template>

            <!-- 表格操作 -->
            <template #operation="scope">
                <div style="display: flex">
                    <el-button type="primary" link @click="addMenu(scope.row.ID)">添加子菜单</el-button>
                    <el-button type="primary" link @click="editMenu(scope.row)">编辑</el-button>
                </div>
            </template>
        </GuiProTable>

        <DialogSysTemUserAddEdit ref="DialogAddEditRef" @confirm="getTableData" />

        <el-drawer
            v-model="dialogFormVisible"
            size="60%"
            :before-close="handleClose"
            :show-close="false"
        >
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="text-lg">{{ dialogTitle }}</span>
                    <div>
                        <el-button @click="closeDialog"> 取 消</el-button>
                        <el-button type="primary" @click="enterDialog"> 确 定</el-button>
                    </div>
                </div>
            </template>

            <GuiWarningBar title="新增菜单，需要在角色管理内配置权限才可使用" />

            <el-form
                v-if="dialogFormVisible"
                ref="menuForm"
                :inline="true"
                :model="form"
                :rules="rules"
                label-position="top"
            >
                <el-row class="w-full">
                    <el-col :span="16">
                        <el-form-item label="文件路径" prop="component">
                            <components-cascader
                                :component="form.component"
                                @change="fmtComponent"
                            />
                            <span style="font-size: 12px; margin-right: 12px"
                            >如果菜单包含子菜单，请创建router-view二级路由页面或者</span
                            >
                            <el-button
                                style="margin-top: 4px"
                                @click="form.component = 'view/routerHolder.vue'"
                            >
                                点我设置
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="展示名称" prop="meta.title">
                            <el-input v-model="form.meta.title" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="w-full">
                    <el-col :span="8">
                        <el-form-item label="路由Name" prop="path">
                            <el-input
                                v-model="form.name"
                                autocomplete="off"
                                placeholder="唯一英文字符串"
                                @change="changeName"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="path">
                            <template #label>
                <span style="display: inline-flex; align-items: center">
                  <span>路由Path</span>
                  <el-checkbox
                      v-model="checkFlag"
                      style="margin-left: 12px; height: auto"
                  >添加参数</el-checkbox
                  >
                </span>
                            </template>

                            <el-input
                                v-model="form.path"
                                :disabled="!checkFlag"
                                autocomplete="off"
                                placeholder="建议只在后方拼接参数"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否隐藏">
                            <el-select
                                v-model="form.hidden"
                                style="width: 100%"
                                placeholder="是否在列表隐藏"
                            >
                                <el-option :value="false" label="否" />
                                <el-option :value="true" label="是" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="w-full">
                    <el-col :span="8">
                        <el-form-item label="父节点ID">
                            <el-cascader
                                v-model="form.parentId"
                                style="width: 100%"
                                :disabled="!isEdit"
                                :options="menuOption"
                                :props="{
                                  checkStrictly: true,
                                  label: 'title',
                                  value: 'ID',
                                  disabled: 'disabled',
                                  emitPath: false
                                }"
                                :show-all-levels="false"
                                filterable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="图标" prop="meta.icon">
                            <icon v-model="form.meta.icon" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="排序标记" prop="sort">
                            <el-input v-model.number="form.sort" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="w-full">
                    <el-col :span="8">
                        <el-form-item prop="meta.activeName">
                            <template #label>
                                <div>
                                    <span> 高亮菜单 </span>
                                    <el-tooltip
                                        content="注：当到达此路由时候，指定左侧菜单指定name会处于活跃状态（亮起），可为空，为空则为本路由Name。"
                                        placement="top"
                                        effect="light"
                                    >
                                        <el-icon>
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                            <el-input
                                v-model="form.meta.activeName"
                                :placeholder="form.name"
                                autocomplete="off"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="KeepAlive" prop="meta.keepAlive">
                            <el-select
                                v-model="form.meta.keepAlive"
                                style="width: 100%"
                                placeholder="是否keepAlive缓存页面"
                            >
                                <el-option :value="false" label="否" />
                                <el-option :value="true" label="是" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="CloseTab" prop="meta.closeTab">
                            <el-select
                                v-model="form.meta.closeTab"
                                style="width: 100%"
                                placeholder="是否自动关闭tab"
                            >
                                <el-option :value="false" label="否" />
                                <el-option :value="true" label="是" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="w-full">
                    <el-col :span="8">
                        <el-form-item>
                            <template #label>
                                <div><span> 是否为基础页面 </span>
                                    <el-tooltip
                                        content="此项选择为是，则不会展示左侧菜单以及顶部信息。"
                                        placement="top"
                                        effect="light"
                                    >
                                        <el-icon>
                                            <QuestionFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>

                            <el-select v-model="form.meta.defaultMenu" style="width: 100%" placeholder="是否为基础页面">
                                <el-option :value="false" label="否" />
                                <el-option :value="true" label="是" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup lang="jsx">
    import {
        Api_Common_Menu_Add,
        Api_Common_Menu_Update,
        Api_Common_Menu_GetList
    } from '@/api/common/menu'
    import icon from './components/menu/icon.vue'
    import { GuiWarningBar} from '@/components'
    import { reactive, ref } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { CirclePlus, QuestionFilled } from '@element-plus/icons-vue'
    import { toLowerCase } from '@/utils/common/stringFun'
    import ComponentsCascader from './components/menu/components-cascader.vue'
    import pathInfo from '@/pathInfo.json'
    import { DialogSysTemUserAddEdit } from '@/dialog/system'
    import { GuiProTable } from '@/components'

    defineOptions({
        name: 'SystemMenu'
    })

    const GuiProTableRef = ref()

    // 表格配置项
    const columns = reactive([
        {
            prop: 'id',
            label: 'ID',
            minWidth: 80
        },
        {
            prop: 'authorityName',
            label: '展示名称',
            minWidth: 200,
            render: (scope) => {
                return scope.row.meta.title
            }
        },
        {
            prop: 'authorityName',
            label: '图标',
            minWidth: 200,
            render: (scope) => {
                if (scope.row.meta.icon) {
                    return (<el-icon>
                        <component is={scope.row.meta.icon} />
                    </el-icon>)
                } else {
                    return scope.row.meta.icon
                }
            }
        },
        {
            prop: 'name',
            label: '路由Name',
            minWidth: 200
        },
        {
            prop: 'path',
            label: '路由Path',
            minWidth: 200
        },
        {
            prop: 'hidden',
            label: '是否隐藏',
            minWidth: 200,
            render: (scope) => {
                return scope.row.hidden ? '隐藏' : '显示'
            }
        },
        {
            prop: 'parentId',
            label: '父节点',
            minWidth: 200
        },
        {
            prop: 'sort',
            label: '排序',
            minWidth: 200
        },
        {
            prop: 'component',
            label: '文件路径',
            minWidth: 200
        },
        { prop: 'operation', label: '操作', fixed: 'right', minWidth: 180 }
    ])
    const tableData = ref([])
    const getTableData = async () => {
        const table = await Api_Common_Menu_GetList()
        if (table.code === 200) {
            tableData.value = table.data
        }
    }
    getTableData()
    const rules = reactive({
        path: [{ required: true, message: '请输入菜单name', trigger: 'blur' }],
        component: [{ required: true, message: '请输入文件路径', trigger: 'blur' }],
        'meta.title': [
            { required: true, message: '请输入菜单展示名称', trigger: 'blur' }
        ]
    })

    const fmtComponent = (component) => {
        form.value.component = component.replace(/\\/g, '/')
        form.value.name = toLowerCase(pathInfo['/src/' + component])
        form.value.path = form.value.name
    }

    const form = ref({
        id: 0,
        path: '',
        name: '',
        hidden: false,
        parentId: 0,
        component: '',
        meta: {
            activeName: '',
            title: '',
            icon: '',
            defaultMenu: false,
            closeTab: false,
            keepAlive: false
        },
        parameters: [
            // { 'type': 'query', 'key': 'name1', 'value': '123' }
        ],
        menuBtn: [
            // { 'name': 'add', 'desc': '新增' },
            // { 'name': 'del', 'desc': '删除' }
        ]
    })
    const changeName = () => {
        form.value.path = form.value.name
    }

    const handleClose = (done) => {
        initForm()
        done()
    }
    // 删除菜单
    /*const deleteMenu = (ID) => {
        ElMessageBox.confirm(
            '此操作将永久删除所有角色下该菜单, 是否继续?',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
        )
            .then(async () => {
                const res = await deleteBaseMenu({ID})
                if (res.code === 0) {
                    ElMessage({
                        type: 'success',
                        message: '删除成功!'
                    })

                    getTableData()
                }
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消删除'
                })
            })
    }*/
    // 初始化弹窗内表格方法
    const menuForm = ref(null)
    const checkFlag = ref(false)
    const initForm = () => {
        checkFlag.value = false
        menuForm.value.resetFields()
        form.value = {
            id: 0,
            path: '',
            name: '',
            hidden: false,
            parentId: 0,
            component: '',
            meta: {
                title: '',
                icon: '',
                defaultMenu: false,
                closeTab: false,
                keepAlive: false
            }
        }
    }
    // 关闭弹窗

    const dialogFormVisible = ref(false)
    const closeDialog = () => {
        initForm()
        dialogFormVisible.value = false
    }
    // 添加menu
    const enterDialog = async () => {
        menuForm.value.validate(async (valid) => {
            if (valid) {
                let params = {
                    'parentId': form.value.parentId,
                    'name': form.value.meta.title,
                    'component': form.value.component,
                    'icon': form.value.meta.icon,
                    'path': form.value.path,
                    'routeName': form.value.name,
                    'keepAlive': form.value.meta.keepAlive,
                    'isHide': form.value.hidden,
                    'sort': form.value.sort
                }

                console.log('提交参数', form.value, params)
                ElMessage.warning('待开发！')

                /*let res
                if (isEdit.value) {
                    params.id = form.value.id
                    res = await Api_Common_Menu_Update(params)
                } else {
                    res = await Api_Common_Menu_Add(form.value)
                }
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: isEdit.value ? '编辑成功' : '添加成功!'
                    })
                    getTableData()
                }
                initForm()
                dialogFormVisible.value = false*/
            }
        })
    }

    const menuOption = ref([
        {
            ID: '0',
            title: '根菜单'
        }
    ])
    const setOptions = async () => {
        menuOption.value = [
            {
                ID: 0,
                title: '根目录'
            }
        ]
        setMenuOptions(tableData.value, menuOption.value, false)
    }
    const setMenuOptions = (menuData, optionsData, disabled) => {
        menuData &&
        menuData.forEach((item) => {
            if (item.children && item.children.length) {
                const option = {
                    title: item.meta.title,
                    ID: item.id,
                    disabled: disabled || item.id === form.value.id,
                    children: []
                }
                setMenuOptions(
                    item.children,
                    option.children,
                    disabled || item.id === form.value.id
                )
                optionsData.push(option)
            } else {
                const option = {
                    title: item.meta.title,
                    ID: item.id,
                    disabled: disabled || item.id === form.value.id
                }
                optionsData.push(option)
            }
        })
    }

    // 添加菜单方法，id为 0则为添加根菜单
    const isEdit = ref(false)
    const dialogTitle = ref('新增菜单')
    const addMenu = (id) => {
        dialogTitle.value = '新增菜单'
        form.value.parentId = id
        isEdit.value = false
        setOptions()
        dialogFormVisible.value = true
    }
    // 修改菜单方法
    const editMenu = async (row) => {
        dialogTitle.value = '编辑菜单'
        // const res = await getBaseMenuById({id})
        form.value = row
        isEdit.value = true
        setOptions()
        dialogFormVisible.value = true
    }
</script>

<style scoped lang="scss">
    .warning {
        color: var(--el-color-danger);
    }

    .icon-column {
        display: flex;
        align-items: center;

        .el-icon {
            margin-right: 8px;
        }
    }
</style>
