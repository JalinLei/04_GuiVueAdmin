/**
 * 网站配置文件
 */
const greenText = (text) => `\x1b[32m${text}\x1b[0m`

const config = {
    appLogo: 'logo.svg',
    showViteLogo: false,
    logs: []
}

export const viteLogo = (env) => {
    if (config.showViteLogo) {
        console.log('\n')
    }
}

export default config
