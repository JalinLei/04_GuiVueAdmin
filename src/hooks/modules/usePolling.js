/**********************************
 * @Desc: 轮询执行方法
 * @Author:  Jalin
 **********************************/

import { ref, onUnmounted } from 'vue'

export const usePolling = (refreshMethod, interval = 5000) => {
    const pollId = ref(null) // 保存轮询的id，方便停止轮询

    const startPolling = () => {
        pollId.value = setInterval(() => {
            // 调用传入的刷新方法
            refreshMethod()
        }, interval)
    }

    // 清理定时器
    onUnmounted(() => {
        if (pollId.value) {
            clearInterval(pollId.value)
        }
    })

    return startPolling
}
