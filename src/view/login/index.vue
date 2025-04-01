<template>
    <div id="Login" class="gui-login w-full h-full relative">
        <div class="login-wrapper">
            <div class="system-about">
                <div class="logo-title">
                    <img class="w-24" :src="$GUI_VUE_ADMIN.appLogo" alt="logo" />
                    <span class="title">{{ $GUI_VUE_ADMIN.appName }}</span>
                </div>
                <p class="description">{{ $GUI_VUE_ADMIN.description }}</p>
            </div>

            <div class="divider"></div>

            <div class="login-container">
                <div class="login-box">
                    <h2 class="login-title">用户登录</h2>
                    <el-form ref="loginForm"
                             :model="loginFormData"
                             :rules="rules"
                             :validate-on-rule-change="false"
                             @keyup.enter="submitForm">
                        <el-form-item prop="username" class="mb-6">
                            <el-input v-model="loginFormData.username" size="large" placeholder="请输入用户名"
                                      suffix-icon="user" />
                        </el-form-item>
                        <el-form-item prop="password" class="mb-6">
                            <el-input v-model="loginFormData.password" show-password size="large" type="password"
                                      placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item class="mb-6">
                            <el-button class="shadow shadow-active h-11 w-full" type="primary" size="large"
                                       @click="submitForm">登 录
                            </el-button>
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
    import { useUserStore } from '@/pinia/modules/user'

    defineOptions({
        name: 'Login'
    })

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
    .gui-login {
        display: flex;
        background: url(/src/assets/images/login/login_bg.png) no-repeat center center;
        background-size: cover;
        justify-content: center;
        align-items: center;
        min-height: 100vh;

        .login-wrapper {
            display: flex;
            background: rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            position: relative;
            width: 900px;
            padding: 20px 0;
        }

        .system-about {
            flex: 1.2;
            padding: 40px 60px;
            position: relative;

            .logo-title {
                display: flex;
                align-items: center;
                margin-bottom: 30px;

                img {
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                }

                .title {
                    font-size: 2.5rem;
                    font-weight: 600;
                    color: #ffffff;
                    margin-left: 15px;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.6);
                    letter-spacing: 1px;
                }
            }

            .description {
                font-size: 1.2rem;
                color: #ffffff;
                opacity: 1;
                line-height: 1.8;
                text-shadow: 0 2px 8px rgba(0,0,0,0.6);
                font-weight: 400;
                letter-spacing: 0.5px;
                padding: 10px 0;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 50px;
                    height: 3px;
                    background: linear-gradient(90deg, #fff, transparent);
                    border-radius: 3px;
                }
            }
        }

        .divider {
            width: 1px;
            margin: 20px 0;
            background: linear-gradient(to bottom,
                transparent,
                rgba(255, 255, 255, 0.5),
                transparent
            );
            align-self: stretch;
        }

        .login-container {
            flex: 0.8;
            padding: 40px 60px;

            .login-box {
                width: 100%;
            }

            .login-title {
                font-size: 2rem;
                font-weight: 600;
                color: #ffffff;
                text-align: center;
                margin-bottom: 30px;
                text-shadow: 0 2px 8px rgba(0,0,0,0.6);
            }
        }

        :deep(.el-input__wrapper) {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            height: 45px;
            box-shadow: none !important;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;

            &:hover, &.is-focus {
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

            .divider {
                width: auto;
                height: 1px;
                margin: 0 20px;
            }

            .system-about,
            .login-container {
                padding: 30px;
            }
        }
    }
</style>
