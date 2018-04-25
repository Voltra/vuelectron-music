import VueRouterPlugin from "vue-router"
import LocalStoragePlugin from "@vplugins/localStorage"
import JsonClientPlugin from "@vplugins/json"
import ElectronBridgePlugin from "@vplugins/bridge"
import RequirePlugin from "@vplugins/require"

import indexedDBFactory from "@vplugins/indexedDBFactory"


export default {
	plugins: [VueRouterPlugin, LocalStoragePlugin, JsonClientPlugin, ElectronBridgePlugin, RequirePlugin],
	factories: {indexedDBFactory}
}