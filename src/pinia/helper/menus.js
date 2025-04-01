/**
 * 菜单存储 Map
 */
class MenusHelper {
    constructor(routes) {
        this.routeMap = new Map()
        this.initRouteMap(routes)
    }

    /**
     * 递归遍历路由表，存入 Map
     * - key: name 和 path 皆可查询
     * - value: 路由对象
     */
    initRouteMap(routes, parentPath = '') {
        routes
            .filter(route => !route.hidden) // 过滤掉 hidden: true
            .forEach((route) => {
                const fullPath = parentPath ? `${parentPath}/${route.path}`.replace(/\/+/g, '/') : route.path
                const filteredRoute = { ...route, fullPath }

                this.routeMap.set(route.name, filteredRoute)
                this.routeMap.set(route.path, filteredRoute)

                if (route.children) {
                    // 递归处理子路由，并确保子路由数组为空时不存储
                    const filteredChildren = route.children.filter(child => !child.hidden)
                    if (filteredChildren.length > 0) {
                        filteredRoute.children = filteredChildren
                        this.initRouteMap(filteredChildren, fullPath)
                    } else {
                        delete filteredRoute.children
                    }
                }
            })
    }

    /**
     * 获取完整的路由信息（可选择是否包含 children）
     * @param {string} key - 可以是 name 或 path
     * @param {boolean} includeChildren - 是否包含子路由，默认 true
     * @returns {object | null}
     */
    getRouteByKey(key, includeChildren = true) {
        const route = this.routeMap.get(key)
        if (!route) return null

        return includeChildren ? route : { ...route, children: undefined }
    }

    /**
     * 获取当前路由的子路由（可选择是否包含 children）
     * @param {string} key - 可以是 name 或 path
     * @param {boolean} includeChildren - 是否包含子路由的子级，默认 true
     * @returns {array} 子路由列表
     */
    getChildrenByKey(key, includeChildren = true) {
        const children = this.getRouteByKey(key)?.children || []
        return includeChildren ? children : children.map(child => ({ ...child, children: undefined }))
    }
}

export default MenusHelper
