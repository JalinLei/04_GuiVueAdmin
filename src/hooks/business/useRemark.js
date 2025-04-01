/**********************************
 * @Desc: 添加/编辑备注
 * @Author:  Jalin
 **********************************/

import { ref } from 'vue'
import { UtilsBom } from '@/utils'

export function useRemark() {
    // 虚拟机抽屉框
    const drawerDetailVisible = ref(false)  // 控制对话框是否显示
    const drawerDetailVirtualId = ref('')
    const drawerDetailTitle = ref('')
    // 当前虚拟机数据
    const drawerDetailCurrentVmData = ref({})

    const openVmDrawerDetails = (row) => {
        drawerDetailVirtualId.value = row.ID
        drawerDetailTitle.value = row.name
        drawerDetailCurrentVmData.value = row
        drawerDetailVisible.value = true // 打开抽屉
    }

    const closeVmDrawerDetails = () => {
        drawerDetailVisible.value = false  // 关闭抽屉
    }

    /**
     * 打开远程VNC
     * @param title window标题
     * @param virtualId 虚拟机ID
     */
    const openGuacamoleWindow = (title = '', virtualId = 0) => {
        // 获取当前窗口的宽度和高度
        const windowWidth = 1300
        const windowHeight = 850

        const guacamoleWindow = UtilsBom.openCenteredWindow('', windowWidth, windowHeight)
        const VncTitle = title
        const VncId = 'vcloud' + virtualId

        if (guacamoleWindow) {
            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${VncTitle}</title>
                <link rel="stylesheet" type="text/css" href="/guacamole-common-js/guacamole.css">
            </head>
            <body>
            <div id="display"></div>
            <script type="text/javascript" src="/guacamole-common-js/all.min.js"><\/script>
            <script type="text/javascript">window.onload = function () {
                const display = document.getElementById("display");
                const guac = new Guacamole.Client(new Guacamole.WebSocketTunnel("ws://vnc.vcloud.com/ws?vm=${VncId}"));

                // 将 Guacamole 显示元素添加到页面中
                display.appendChild(guac.getDisplay().getElement());

                guac.onerror = function (error) {
                    // alert(error);
                    console.error(error);
                };
                guac.connect();
                window.onunload = function () {
                    guac.disconnect();
                };

                const mouse = new Guacamole.Mouse(guac.getDisplay().getElement());
                mouse.onmousedown = mouse.onmouseup = mouse.onmousemove = function (mouseState) {
                    guac.sendMouseState(mouseState);
                };
                const keyboard = new Guacamole.Keyboard(document);
                keyboard.onkeydown = function (keysym) {
                    guac.sendKeyEvent(1, keysym);
                };
                keyboard.onkeyup = function (keysym) {
                    guac.sendKeyEvent(0, keysym);
                };
            };<\/script>
            <\/body>
            <\/html>
            `
            // 将定义的 HTML 内容写入新窗口
            guacamoleWindow.document.write(htmlContent)
            // 关闭 document.write 流
            guacamoleWindow.document.close()
        }
    }

    return {
        drawerDetailVisible,
        openVmDrawerDetails,
        closeVmDrawerDetails,
        drawerDetailCurrentVmData,
        drawerDetailTitle,
        drawerDetailVirtualId,
        openGuacamoleWindow
    }
}
