<template>
    <div id="Login" class="gui-login2 w-full h-full relative">
        <div class="system__about">
            <h2 class="system__title">{{ appConfig?.AppName }}</h2>
            <p class="system__description">{{ appConfig?.AppDesc }}</p>
        </div>

        <div class="login-wrapper">
            <div class="login-container">
                <div class="login-box">
                    <h2 class="login-title">用户登录</h2>

                    <el-form ref="loginForm" :model="loginFormData" :rules="rules" :validate-on-rule-change="false" @keyup.enter="submitForm">
                        <el-form-item prop="username" class="mb-6">
                            <el-input v-model="loginFormData.username" size="large" placeholder="请输入用户名">
                                <template #prefix>
                                    <el-icon class="el-input__icon" :size="22">
                                        <GgiPersonFill />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" class="mb-6">
                            <el-input v-model="loginFormData.password" show-password size="large" type="password" placeholder="请输入密码">
                                <template #prefix>
                                    <el-icon class="el-input__icon" :size="20">
                                        <GgiLockFill />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="mb-6 mt-10">
                            <el-button class="shadow shadow-active h-11 w-full" type="primary" size="large" @click="submitForm">登 录 </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useUserStore, useAppStore } from '@/pinia'
    import { storeToRefs } from 'pinia'

    defineOptions({
        name: 'Login2'
    })

    const appStore = useAppStore()
    const { appConfig } = storeToRefs(appStore)

    const router = useRouter()
    // 验证函数
    const checkUsername = (rule, value, callback) => {
        if (value.length < 3) {
            return callback(new Error('请输入正确的用户名'))
        } else {
            callback()
        }
    }
    const checkPassword = (rule, value, callback) => {
        if (value.length < 3) {
            return callback(new Error('请输入正确的密码'))
        } else {
            callback()
        }
    }

    // 登录相关操作
    const loginForm = ref(null)
    const loginFormData = reactive({
        username: 'admin',
        password: 'admin123456!'
    })
    const rules = reactive({
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        captcha: [
            {
                message: '验证码格式不正确',
                trigger: 'blur'
            }
        ]
    })

    const userStore = useUserStore()
    const login = async () => {
        return await userStore.LoginIn(loginFormData)
    }
    const submitForm = () => {
        loginForm.value.validate(async (v) => {
            if (!v) {
                // 未通过前端静态验证
                ElMessage({
                    type: 'error',
                    message: '请正确填写登录信息',
                    showClose: true
                })
                return false
            }

            // 通过验证，请求登陆
            const flag = await login()

            // 登陆失败
            if (!flag) {
                return false
            }

            // 登陆成功
            return true
        })
    }
</script>

<style lang="scss">
    .gui-login2 {
        display: flex;
        background: url(/src/assets/images/login/login_bg2.png) no-repeat center center;
        background-size: 100% 100%;
        justify-content: center;
        align-items: center;
        min-height: 100vh;

        .system__about {
            position: absolute;
            top: 26vh;
            width: 600px;
            left: 18.5vw;

            // 屏幕宽度小于等于1680px时
            @media (max-width: 1680px) {
                width: 550px;
                left: 16vw;

                .system__title {
                    margin-bottom: 32px;
                    font-size: 3rem;
                }
            }

            // 屏幕宽度小于等于1440px时
            @media (max-width: 1440px) {
                width: 500px;
                left: 14vw;

                .system__title {
                    margin-bottom: 25px;
                    font-size: 2.8rem;
                }
            }

            .system__title {
                font-size: 3.2rem;
                font-weight: 600;
                color: var(--gui-color-text-regular);
                text-align: left;
                margin-bottom: 40px;
                margin-top: 0;
                font-family: '微软雅黑 light';
                letter-spacing: 4px;
            }
            .system__description {
                font-size: 16px;
                line-height: 36px;
                letter-spacing: 1px;
                color: var(--gui-color-text-secondary);
            }
        }

        .login-wrapper {
            background-color: #fff;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: absolute;
            top: 26.5vh;
            width: 380px;
            padding: 20px 0;

            // 默认
            right: 20.8vw;

            // 屏幕宽度大于等于1920px时
            @media (min-width: 1920px) {
                right: 20.8vw;
            }
            // 屏幕宽度大于等于1680px时
            @media (max-width: 1680px) {
                right: 19.2vw;
            }
            // 屏幕宽度小于等于1440px时
            @media (max-width: 1440px) {
                right: 17.5vw;
            }
        }
   
        .login-container {
            padding: 16px 48px;

            .login-box {
                width: 100%;
            }

            .login-title {
                font-size: 1.8rem;
                font-weight: 400;
                color: var(--gui-color-text-regular);
                text-align: center;
                margin-bottom: 60px;
                margin-top: 30px;
            }
        }

        :deep(.el-input__wrapper) {
            background-color: red;
            // background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            height: 45px;
            box-shadow: none !important;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;

            &:hover,
            &.is-focus {
                background: rgba(0, 0, 0, 0.3);
                border-color: rgba(255, 255, 255, 0.6);
            }

            .el-input__inner {
                color: #ffffff;

                &::placeholder {
                    color: rgba(255, 255, 255, 0.9);
                }
            }
        }

        :deep(.el-button) {
            height: 45px;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            background: rgba(64, 158, 255, 0.8);
            border: none;
            color: #ffffff;
            transition: all 0.3s ease;

            &:hover {
                background: rgba(64, 158, 255, 0.9);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }

        :deep(.el-form-item) {
            .w-1\/3 {
                background: rgba(0, 0, 0, 0.2) !important;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
        }

        @media (max-width: 768px) {
            .login-wrapper {
                flex-direction: column;
                width: 90%;
                margin: 20px;
            }

            .login-container {
                padding: 30px;
            }
        }

        input:-webkit-autofill {
            background-color: #f1f3f4 !important;
            -webkit-box-shadow: 0 0 0px 1000px #f1f3f4 inset !important;
            box-shadow: 0 0 0px 1000px #f1f3f4 inset !important;
            -webkit-text-fill-color: var(--gui-color-text-regular) !important;
        }
    }
</style>
