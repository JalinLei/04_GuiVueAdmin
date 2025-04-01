/**********************************
 * @Desc: 注册（加载网站配置文件夹）
 * @Author:  Jalin
 **********************************/

import { register } from './global'

export default {
    install: (app) => {
        register(app)
    }
}
