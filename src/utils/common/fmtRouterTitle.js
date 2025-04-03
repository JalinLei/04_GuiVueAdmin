export const fmtTitle = (title, now) => {
    // 用于匹配所有 ${key} 格式的占位符
    const reg = /\$\{(.+?)\}/
    // 用于提取 ${key} 里面的 key 名称
    const reg_g = /\$\{(.+?)\}/g
    const result = title.match(reg_g)
    if (result) {
        result.forEach((item) => {
            // 提取 key 名称
            const key = item.match(reg)[1]
            // 从 now.params 或 now.query 获取值
            const value = now.params[key] || now.query[key]
            // 替换 title 里的占位符
            title = title.replace(item, value)
        })
    }
    // 拼接TabTitle
    let tabTitle = ''
    if (now.params?.tabTitle || now.query?.tabTitle) {
        tabTitle = now.query.tabTitle || now.query.tabTitle
    }

    return title + (tabTitle ? '-' + tabTitle : '')
}
