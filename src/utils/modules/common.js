/**********************************
 * @Desc: 公用方法
 * @Author:  Jalin
 **********************************/

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUrlWithParams() {
    const url = {
        hash: location.hash.substring(1),
        history: location.pathname + location.search
    };
    return url[mode];
}
