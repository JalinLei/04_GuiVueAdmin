import { Api_Common_User_Login, Api_Common_User_GetUserInfo, Api_Common_User_LoginOut } from '@/api/common/user'
import router from '@/router/index'
import { ElLoading, ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouterStore } from './router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useStorage } from '@vueuse/core'
import { useAppStore } from '@/pinia'

export const useUserStore = defineStore('user', () => {
    const appStore = useAppStore()
    const loadingInstance = ref(null)

    const userInfo = ref({
        uuid: '',
        nickName: '',
        headerImg: '',
        authority: {}
    })
    const token = useStorage('token', '')
    const xToken = useCookies('x-token')
    const currentToken = computed(() => token.value || xToken.value || '')

    const setUserInfo = (val) => {
        userInfo.value = val
        if (val.originSetting) {
            Object.keys(appStore.config).forEach((key) => {
                if (val.originSetting[key] !== undefined) {
                    appStore.config[key] = val.originSetting[key]
                }
            })
        }
    }

    const setToken = (val) => {
        token.value = val
        xToken.value = val
    }

    const NeedInit = async () => {
        await ClearStorage()
        await router.push({ name: 'Init', replace: true })
    }

    const ResetUserInfo = (value = {}) => {
        userInfo.value = {
            ...userInfo.value,
            ...value
        }
    }
    /* 获取用户信息*/
    const GetUserInfo = async () => {
        /*const res = await Api_Common_User_GetUserInfo()
        if (res.code === 200) {
            setUserInfo(res.data.userInfo)
        }
        return res*/

        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        setUserInfo(userInfo)
        return new Promise(async (resolve, reject) => {
            resolve({
                'code': 200,
                'message': 'SUCCESS',
                'refreshToken': null,
                'returnCode': 'SUCCESS',
                'data': {
                    'userInfo': userInfo
                }
            })
        })
    }
    /* 登录*/
    const LoginIn = async (loginInfo) => {
        try {
            loadingInstance.value = ElLoading.service({
                fullscreen: true,
                text: '登录中，请稍候...'
            })

            const res = await Api_Common_User_Login(loginInfo)

            if (res.code !== 200) {
                ElMessage.error(res.message || '登录失败')
                return false
            }

            const ReturnUserInfo = {
                ...res.data.user,
                nickName: res.data.user.userName,
                authority: {
                    defaultRouter: 'Dashboard' // 默认首页路由
                },
                authorities: [],
                phone: null,
                email: null,
                enable: null,
                originSetting: null
            }

            // 登陆成功，设置用户信息和权限相关信息
            setUserInfo(ReturnUserInfo)
            setToken(`${res.data.token_type} ${res.data.access_token}`)

            window.localStorage.setItem('userInfo', JSON.stringify(ReturnUserInfo))

            // 初始化路由信息
            const routerStore = useRouterStore()
            await routerStore.SetAsyncRouter()
            const asyncRouters = routerStore.asyncRouters

            routerStore.setLeftMenu(ReturnUserInfo.authority.defaultRouter)

            // 注册到路由表里
            asyncRouters.forEach((asyncRouter) => {
                router.addRoute(asyncRouter)
            })

            if (!router.hasRoute(userInfo.value.authority.defaultRouter)) {
                ElMessage.error('请联系管理员进行授权')
            } else {
                await router.replace({ name: userInfo.value.authority.defaultRouter })
            }

            const isWindows = /windows/i.test(navigator.userAgent)
            window.localStorage.setItem('osType', isWindows ? 'WIN' : 'MAC')

            // 全部操作均结束，关闭loading并返回
            return true
        } catch (error) {
            console.error('LoginIn error:', error)
            return false
        } finally {
            loadingInstance.value?.close()
        }
    }
    /* 登出*/
    const LoginOut = async () => {
        /*const res = await Api_Common_User_LoginOut()

        // 登出失败
        if (res.code !== 200) {
            return
        }*/

        await ClearStorage()

        // 把路由定向到登录页，无需等待直接reload
        router.push({ name: 'Login', replace: true })
        window.location.reload()
    }
    /* 清理数据 */
    const ClearStorage = async () => {
        token.value = ''
        xToken.value = ''
        sessionStorage.clear()
        localStorage.removeItem('originSetting')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
    }

    return {
        userInfo,
        token: currentToken,
        NeedInit,
        ResetUserInfo,
        GetUserInfo,
        LoginIn,
        LoginOut,
        setToken,
        loadingInstance,
        ClearStorage
    }
})
