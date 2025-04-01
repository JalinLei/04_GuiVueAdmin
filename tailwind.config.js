/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    important: true,
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1A73E8", // 默认（Light 模式）
                    dark: "#00BAFF",    // Dark 模式
                },  // Element Plus 主色
                success: {
                    DEFAULT: "#34A853",
                    dark: "#13CF64"
                },  // 成功色
                warning: {
                    DEFAULT: "#F7A825",
                    dark: "#F9C824"
                },  // 警告色
                danger: {
                    DEFAULT: "#EC414D",
                    dark: "#F52F3A"
                },   // 危险色
                info: {
                    DEFAULT: "#BDBDBD",
                    dark: "rgba(152, 200, 222, 0.7)"
                },   // 信息色
            },
            backgroundColor: {
                main: '#F5F5F5'
            },
            textColor: {
                active: 'var(--el-color-primary)'
            },
            boxShadowColor: {
                active: 'var(--el-color-primary)'
            },
            borderColor: {
                'table-border': 'var(--el-border-color-lighter)'
            }
        }
    },
    darkMode: 'class',
    plugins: []
}
