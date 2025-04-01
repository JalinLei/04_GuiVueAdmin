import { emitter } from '@/utils/common/bus.js'

export const closeThisPage = () => {
    emitter.emit('closeThisPage')
}
