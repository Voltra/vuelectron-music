//LIBS
import VueRouter from "vue-router"
// import Vuex from "vuex"
import AsyncComputedPlugin from "vue-async-computed"

//REGULAR PLUGINS
import LocalStoragePlugin from "@vplugins/localStorage"
import JsonClientPlugin from "@vplugins/json"
import ElectronBridgePlugin from "@vplugins/bridge"
import RequirePlugin from "@vplugins/require"
import CssVarPlugin from "@vplugins/cssvar"
import ScrollBarY_Plugin from "@vplugins/scrollbar-y"
import ScrollBarX_Plugin from "@vplugins/scrollbar-x"

//FACTORY-BASED PLUGINS
import indexedDBFactory from "@vplugins/indexedDBFactory"


export default {
	plugins: [
		VueRouter,
		// Vuex,
		AsyncComputedPlugin,
		LocalStoragePlugin,
		JsonClientPlugin,
		ElectronBridgePlugin,
		RequirePlugin,
		CssVarPlugin,
		ScrollBarY_Plugin,
		ScrollBarX_Plugin,
	],
	factories: {
		indexedDBFactory,
	}
}