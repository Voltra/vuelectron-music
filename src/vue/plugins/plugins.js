import LocalStoragePlugin from "@vplugins/localStorage"
import JsonClientPlugin from "@vplugins/json"

import indexedDBFactory from "@vplugins/indexedDBFactory"


export default {
	plugins: [LocalStoragePlugin, JsonClientPlugin],
	factories: {indexedDBFactory}
}