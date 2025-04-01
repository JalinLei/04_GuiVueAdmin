<template>
    <div class="gui-tabs-component">
        <div class="tabs-component__menu">
            <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
                <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
                    <template #label>
                        <el-icon v-if="item.icon && tabsIcon" class="tabs-icon">
                            <component :is="item.icon"></component>
                        </el-icon>
                        {{ item.title }}
                    </template>
                </el-tab-pane>
            </el-tabs>

            <MoreButton :namespace="props.namespace" />
        </div>
    </div>
</template>

<script setup>
    import Sortable from "sortablejs";
    import {ref, computed, watch, onMounted} from "vue";
    import {useRoute, useRouter} from "vue-router";
    import {useTabsStore} from "@/pinia";
    import MoreButton from "./components/MoreButton.vue";

    const props = defineProps({
        // 接收 namespace 作为唯一标识
        namespace: {
            type: String,
            required: true
        }
    });

    const route = useRoute();
    const router = useRouter();
    const tabStore = useTabsStore();

    const tabsMenuValue = ref(route.fullPath);
    // 计算当前 `namespace` 对应的 tab 列表
    const tabsMenuList = computed(() => tabStore.getTabs(props.namespace));

    onMounted(() => {
        tabsDrop();
        // initTabs();
    });

    // 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
    watch(
        () => route.fullPath,
        () => {
            if (route.meta.isFull) return;
            tabsMenuValue.value = route.fullPath;
            const tabsParams = {
                icon: route.meta.icon,
                title: route.meta.title,
                path: route.fullPath,
                name: route.name,
                close: !route.meta.isAffix,
                isKeepAlive: route.meta.isKeepAlive
            };
            tabStore.addTabs(props.namespace, tabsParams);
        },
        {immediate: true}
    );

    // 初始化需要固定的 tabs
    const initTabs = () => {
        tabStore.setTabs(props.namespace, []);
    };

    // tabs 拖拽排序
    const tabsDrop = () => {
        Sortable.create(document.querySelector(".el-tabs__nav"), {
            draggable: ".el-tabs__item",
            animation: 300,
            onEnd({newIndex, oldIndex}) {
                const tabsList = [...tabStore.getTabs(props.namespace)];
                const currRow = tabsList.splice(oldIndex, 1)[0];
                tabsList.splice(newIndex, 0, currRow);
                tabStore.setTabs(props.namespace, tabsList);
            }
        });
    };

    // Tab 点击切换
    const tabClick = tabItem => {
        const fullPath = tabItem.props.name;
        router.push(fullPath);
    };

    // 移除 Tab
    const tabRemove = fullPath => {
        tabStore.removeTabs(props.namespace, fullPath, fullPath === route.fullPath);
    };
</script>

<style scoped lang="scss">
    @use "./index.scss";
</style>
