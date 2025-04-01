/**********************************
 * @Desc: 针对文件等公用方法
 * @Author:  Jalin
 **********************************/

import { ElMessage } from 'element-plus';

/**
 * 将字节转换为指定单位
 * @param {number} bytes - 输入的字节数
 * @param {string} unit - 目标单位 (支持 B, KB, MB, GB, TB, PB)
 * @param {number} [decimals=2] - 保留的小数位数，默认为 2 位
 * @param {boolean} [withUnit=true] - 是否返回带单位的字符串，默认为 true
 * @returns {string|number} 转换后的值（带单位的字符串或数值）
 */
export const convertBytes = (bytes, unit, decimals = 2, withUnit = true) => {
    if (typeof bytes !== 'number' || bytes < 0) {
        throw new Error('Bytes must be a non-negative number.');
    }

    // 定义单位对应的倍数
    const unitMap = {
        B: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
        PB: 1024 ** 5,
    };

    // 转换目标单位为大写，确保大小写无关
    const upperUnit = unit.toUpperCase();

    // 检查单位是否有效
    if (!unitMap[upperUnit]) {
        throw new Error(`Unsupported unit: ${unit}`);
    }

    // 计算转换后的值
    const convertedValue = bytes / unitMap[upperUnit];

    // 返回带单位的字符串或仅返回数值
    return withUnit
        ? `${convertedValue.toFixed(decimals)} ${upperUnit}` // 带单位
        : parseFloat(convertedValue.toFixed(decimals)); // 不带单位
}

/**
 * 将字节大小转换为合适的单位（如 KB, MB, GB 等）并格式化输出
 * @param {number} bytes - 需要转换的字节数
 * @param {number} [decimals=2] - 保留的小数位数，默认为 2 位
 * @returns {string} 格式化后的字符串（带单位）
 */
export const formatBytes = (bytes, decimals = 2) => {
    // 如果输入的字节数为 0，直接返回 "0 Bytes"
    if (bytes === 0) return '0 Bytes';

    const k = 1024; // 定义 1 KB = 1024 Bytes
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // 定义单位名称
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // 计算当前字节数的单位索引

    // 计算转换后的数值并格式化保留指定小数位
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

    // 返回带单位的字符串
    return `${formattedSize} ${units[i]}`;
}

/**
 * 将带单位的数值（如 KB, MB, GB 等）转换为字节
 * @param {number} value - 数值部分
 * @param {string} unit - 单位 (支持 KB, MB, GB, TB, PB)
 * @returns {number} 转换后的字节数
 */
export const convertToBytes = (value, unit) => {
    if (typeof value !== 'number' || value < 0) {
        throw new Error('传入非数据');
    }

    // 单位对应的倍数
    const unitMap = {
        B: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
        PB: 1024 ** 5,
    };

    const upperUnit = unit.toUpperCase(); // 确保单位大小写无关
    if (!unitMap[upperUnit]) {
        throw new Error(`不支持的单位: ${unit}`);
    }

    return value * unitMap[upperUnit];
}

/**
 * 通过给定的 URL 下载文件
 * @param {string} url - 文件的完整 URL 地址
 * @param {string} [filename] - 下载保存时的文件名（可选）
 */
export const downloadFile = (url, filename = '') => {
    // 创建一个隐藏的 <a> 标签
    const link = document.createElement('a');
    link.href = url;

    // 如果提供了文件名，则设置下载属性
    if (filename) {
        link.download = filename;
    }

    // 添加到 DOM 中，触发点击，然后移除
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * 使用 Fetch 下载文件
 * @param {string} url - 文件的完整 URL 地址
 * @param {string} [filename] - 下载保存时的文件名（可选）
 */
export const downloadFileWithFetch = async (url, filename = '') => {
    try {
        // 发起 GET 请求
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Download failed: ${response.statusText}`);
        }

        // 获取文件数据为 Blob
        const blob = await response.blob();

        // 创建一个隐藏的 <a> 标签
        const link = document.createElement('a');
        const objectURL = URL.createObjectURL(blob);
        link.href = objectURL;

        // 如果提供了文件名，则设置下载属性
        link.download = filename || url.split('/').pop(); // 默认取 URL 中的文件名
        document.body.appendChild(link);

        // 触发点击事件，完成下载
        link.click();

        // 清理 URL 对象和 DOM 节点
        document.body.removeChild(link);
        URL.revokeObjectURL(objectURL);
    } catch (error) {
        console.error('Download error:', error);
    }
}

/**
 * 通用文件下载方法（适用于 API 返回 response 的情况）
 * @param {Object} response - API 返回的响应对象
 * @param {string} [filename] - 下载保存的文件名（可选，若不传则从 headers 获取）
 */
export const downloadFileWithResponse = (response, filename = '') => {
    try {
        // 确保返回的是 Blob 类型
        if (!(response.data instanceof Blob)) {
            ElMessage.error('下载失败：返回数据格式错误');
            return;
        }

        // 获取文件名（优先从 Content-Disposition 解析）
        const disposition = response.headers['content-disposition'];
        let downloadName = filename || 'downloaded-file';
        if (disposition) {
            const match = disposition.match(/filename="?([^;"]+)"?/i);
            if (match) {
                downloadName = decodeURIComponent(match[1]);
            }
        }

        // 创建 Blob 并生成 URL
        const blob = new Blob([response.data]);
        const objectURL = window.URL.createObjectURL(blob);

        // 创建 <a> 标签模拟点击下载
        const link = document.createElement('a');
        link.href = objectURL;
        link.download = downloadName;
        document.body.appendChild(link);
        link.click();

        // 释放 URL 资源
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectURL);
    } catch (error) {
        console.error('下载失败:', error);
        ElMessage.error('下载失败，请稍后重试');
    }
};
