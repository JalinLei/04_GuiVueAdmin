import axios from 'axios' // 引入axios
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'
import router from '@/router'
import { ElLoading } from 'element-plus'
import {UtilsFile} from '@/utils'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 99999
})
let activeAxios = 0
let timer
let loadingInstance
const showLoading = (
    option = {
        target: null
    }
) => {
    const loadDom = document.getElementById('GuiBaseLoadDom')
    activeAxios++
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        if (activeAxios > 0) {
            if (!option.target) option.target = loadDom
            loadingInstance = ElLoading.service(option)
        }
    }, 400)
}

const closeLoading = () => {
    activeAxios--
    if (activeAxios <= 0) {
        clearTimeout(timer)
        loadingInstance && loadingInstance.close()
    }
}
// http request 拦截器
service.interceptors.request.use(
    (config) => {
        if (!config.donNotShowLoading) {
            showLoading(config.loadingOption)
        }
        const userStore = useUserStore()
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': userStore.token,
            'x-user-id': userStore.userInfo?.id,
            ...config.headers
        }
        return config
    },
    (error) => {
        if (!error.config.donNotShowLoading) {
            closeLoading()
        }
        ElMessage({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error
    }
)

// http response 拦截器
service.interceptors.response.use(
    (response) => {
        const userStore = useUserStore()
        if (!response.config.donNotShowLoading) {
            closeLoading()
        }

        // 判断是否是文件下载（blob 类型）
        if (response.config.responseType === 'blob') {
            UtilsFile.downloadFileWithResponse(response) // 调用封装的下载方法
            return Promise.resolve() // 返回空值，避免 Vue 组件误解析
            // return response; // 直接返回 response，避免 JSON 解析失败
        }

        // 正常的 JSON 处理
        if (response.data.code === 200 || response.headers.returnCode === 'SUCCESS') {
            if (response.headers.message) {
                response.data.message = decodeURI(response.headers.message)
            }
            return {
                ...response.data,
                suc: true
            }
        } else {
            ElMessage({
                showClose: true,
                message: response.data.message || decodeURI(response.headers.message),
                type: 'error'
            })
            return response.data.message ? { ...response.data, suc: false } : response
        }
    },
    (error) => {
        if (!error.config.donNotShowLoading) {
            closeLoading()
        }

        if (!error.response) {
            ElMessageBox.confirm(
                `
        <p>检测到请求错误</p>
        <p>${error}</p>
        `,
                '请求报错',
                {
                    dangerouslyUseHTMLString: true,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '稍后重试',
                    cancelButtonText: '取消'
                }
            )
            return
        }

        switch (error.response.status) {
            case 500:
                ElMessageBox.confirm(
                    `
        <p>检测到接口错误${error}</p>
        <p>错误码<span style="color:red"> 500 </span>：此类错误内容常见于后台panic，请先查看后台日志，如果影响您正常使用可强制登出清理缓存</p>
        `,
                    '接口报错',
                    {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        confirmButtonText: '清理缓存',
                        cancelButtonText: '取消'
                    }
                ).then(() => {
                    const userStore = useUserStore()
                    userStore.ClearStorage()
                    router.push({ name: 'Login', replace: true })
                })
                break
            case 404:
                ElMessageBox.confirm(
                    `
          <p>检测到接口错误${error}</p>
          <p>错误码<span style="color:red"> 404 </span>：此类错误多为接口未注册（或未重启）或者请求路径（方法）与api路径（方法）不符--如果为自动化代码请检查是否存在空格</p>
          `,
                    '接口报错',
                    {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        confirmButtonText: '我知道了',
                        cancelButtonText: '取消'
                    }
                )
                break
            case 401:
                ElMessageBox.confirm(
                    `
          <p>无效的令牌</p>
          <p>错误码:<span style="color:red"> 401 </span>错误信息:${error}</p>
          `,
                    '身份信息',
                    {
                        dangerouslyUseHTMLString: true,
                        distinguishCancelAndClose: true,
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消'
                    }
                ).then(() => {
                    const userStore = useUserStore()
                    userStore.ClearStorage()
                    router.push({ name: 'Login', replace: true })
                })
                break
        }

        return error
    }
)
export default service
