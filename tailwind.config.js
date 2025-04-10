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
            boxShadow: {
                base: 'rgba(145, 158, 171, .2) 0px 2px 1px -1px, rgba(145, 158, 171, 0.14) 0px 1px 1px 0px, rgba(145, 158, 171, 0.12) 0px 1px 3px 0px',
                dialog: '0 0 10px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.24)',
                light: '1px -1px 5px rgba(0, 0, 0, 0.12), 0 5px 5px rgba(0, 0, 0, .12)',
                hover: 'rgba(145, 158, 171, 0.24) 0 8px 16px 0',
                button: '0 3px 6px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)',
            },
            borderColor: {
                'table-border': 'var(--el-border-color-lighter)'
            }
        }
    },
    darkMode: 'class',
    plugins: []
}
