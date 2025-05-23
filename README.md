# gui-vue-admin web

## Project setup

```
npm install
```

### 安装Server的依赖包（模拟数据）

```
npm run apiI
```

### 运行Server

```
npm run apiS
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

整理代码结构

```lua
web
 ├── babel.config.js
 ├── Dockerfile
 ├── favicon.ico
 ├── server                     -- 模拟后台数据
 ├── index.html                 -- 主页面
 ├── limit.js                   -- 助手代码
 ├── package.json               -- 包管理器代码
 ├── src                        -- 源代码
 │   ├── api                    -- api 组
 │   ├── App.vue                -- 主页面
 │   ├── assets                 -- 静态资源
 │   ├── components             -- 全局组件
 │   ├── core                   -- Gui组件包
 │   │   ├── config.js          -- Gui网站配置文件
 │   │   ├── guiVueAdmin.js     -- 注册欢迎文件
 │   │   └── global.js          -- 统一导入文件
 │   ├── directive              -- v-auth 注册文件
 │   ├── main.js                -- 主文件
 │   ├── permission.js          -- 路由中间件
 │   ├── pinia                  -- pinia 状态管理器，取代vuex
 │   │   ├── index.js           -- 入口文件
 │   │   └── modules            -- modules
 │   │       ├── router.js
 │   │       └── user.js
 │   ├── router                 -- 路由声明文件
 │   │   └── index.js
 │   ├── style                  -- 全局样式
 │   │   ├── common
 │   │   │   └── var.scss               -- Variables
 │   │   ├── components
 │   │   ├── elementPlus
 │   │   ├── plugins
 │   │   │   └── element_visiable.scss  -- 此处可以全局覆盖 element-plus 样式
 │   │   └── views
 │   ├── utils                  -- 方法包库
 │   │   ├── common             -- 动态路由相关
 │   │   │   ├── asyncRouter.js     -- 动态路由相关
 │   │   │   ├── bus.js             -- 全局mitt声明文件
 │   │   │   ├── date.js            -- 日期相关
 │   │   │   ├── downloadImg.js     -- 下载图片方法
 │   │   │   ├── format.js          -- 格式整理相关
 │   │   │   ├── image.js           -- 图片相关方法
 │   │   │   ├── page.js            -- 设置页面标题
 │   │   │   ├── request.js         -- 请求
 │   │   │   └── stringFun.js       -- 字符串文件
 |   ├── view -- 主要view代码
 |   |   ├── dashboard -- 首页面板
 |   |   ├── layout    -- layout约束页面
 |   |   |   ├── aside
 |   |   |   ├── screenfull     -- 全屏设置
 |   |   |   ├── setting        -- 系统设置
 |   |   |   └── index.vue      -- base 约束
 |   |   ├── login              -- 登录
 |   |   ├── system             -- 系统管理
 |   |   └── routerHolder.vue   -- page 入口页面
 ├── vite.config.js             -- vite 配置文件
 └── yarn.lock

```
