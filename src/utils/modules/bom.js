/**********************************
 * @Desc: 与浏览器相关
 * @Author:  Jalin
 **********************************/
import { ElMessage } from 'element-plus';


/**
 * 打卡窗口
 * @param url 打开的页面地址
 * @param width 新窗口的宽度
 * @param height 新窗口的高度
 */
export const openCenteredWindow = (url, width, height) => {
    // 获取屏幕的宽高
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;

    // 计算窗口的左上角位置，使其居中
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    // 打开新窗口
    return window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top},resizable=yes`);
}

/**
 * 复制
 * @param text 复制文本内容
 */
export const copyText = (text) => {
    // 创建一个临时的 textarea 元素
    const textarea = document.createElement('textarea');

    // 将文本赋值给 textarea
    textarea.value = text;

    // 将 textarea 添加到页面中
    document.body.appendChild(textarea);

    // 选中文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 对于手机设备，使用 setSelectionRange 保证可选中

    try {
        // 执行复制操作
        document.execCommand('copy');
        // 显示复制成功的提示消息
        ElMessage.success('复制成功');
    } catch (err) {
        console.error('Unable to copy text', err);
        ElMessage.error('复制失败');
    }

    // 清理工作：移除临时的 textarea
    document.body.removeChild(textarea);
}
