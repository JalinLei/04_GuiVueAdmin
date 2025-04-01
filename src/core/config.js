/**
 * 网站配置文件
 */
const greenText = (text) => `\x1b[32m${text}\x1b[0m`

const config = {
    appName: 'GuiVueAdmin',
    appLogo: 'logo.svg',
    showViteLogo: false,
    description: "GuiVueAdmin,提供团队协作作战能力,不同团队成员可在平台实现互相配合,交换信息,共享资源等操作,并形成可沉淀,可共享的模块化作战平台,帮助团队提升整体技术水平,渗透测试效率,精度和全面性。",
    logs: []
}

export const viteLogo = (env) => {
    if (config.showViteLogo) {
        console.log('\n')
    }
}

export default config
