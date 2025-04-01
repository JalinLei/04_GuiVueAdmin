import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/plugins/index.scss'
import '@/style/index.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'


// 引入guiVueAdmin前端初始化相关内容
import './core/guiVueAdmin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
import run from '@/core/guiVueAdmin.js'
import auth from '@/directive/auth'
import { store } from '@/pinia'
import App from './App.vue'
import GuiCore from '@/core/config'

const app = createApp(App)
app.config.productionTip = false

console.log(
    `%c Powered By %c ${GuiCore.appName} %c`,
    'background:#0081ff; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
    'background:#354855; padding: 1px 5px; border-radius: 0 3px 3px 0; color: #fff; font-weight: bold;',
    'background:transparent'
)

app.use(run).use(ElementPlus).use(store).use(auth).use(router).mount('#app')
export default app
