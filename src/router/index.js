import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/index.vue')
    },
    {
        path: '/login2',
        name: 'Login2',
        component: () => import('@/view/login/index2.vue')
    },
    {
        path: '/:catchAll(.*)',
        meta: {
            closeTab: true
        },
        component: () => import('@/view/error/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
