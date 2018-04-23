import LocalStoragePlugin from "@vplugins/localStorage"
import JsonClientPlugin from "@vplugins/json"
import ElectronBridgePlugin from "@vplugins/bridge"

import indexedDBFactory from "@vplugins/indexedDBFactory"


export default {
	plugins: [LocalStoragePlugin, JsonClientPlugin, ElectronBridgePlugin],
	factories: {indexedDBFactory}
}