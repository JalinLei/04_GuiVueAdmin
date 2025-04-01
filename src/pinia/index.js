import { createPinia } from 'pinia'
import { useAppStore } from '@/pinia/modules/app'
import { useUserStore } from '@/pinia/modules/user'
import { useTabsStore } from '@/pinia/modules/tabs'
import { useKeepAliveStore } from '@/pinia/modules/keepAlive'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedState)

export { store, useAppStore, useUserStore, useTabsStore, useKeepAliveStore }
