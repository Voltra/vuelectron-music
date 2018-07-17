////LIBS

////REGULAR PLUGINS
import LocalStoragePlugin from "@vplugins/localStorage"
import JsonClientPlugin from "@vplugins/json"
import ElectronBridgePlugin from "@vplugins/bridge"
import RequirePlugin from "@vplugins/require"
import CssVarPlugin from "@vplugins/cssvar"
import ScrollBarY_Plugin from "@vplugins/scrollbar-y"
import ScrollBarX_Plugin from "@vplugins/scrollbar-x"
import ScrollBarXY_Plugin from "@vplugins/scrollbar-xy"

////FACTORY-BASED PLUGINS
import indexedDBFactory from "@vplugins/indexedDBFactory"

const plugins = [
	LocalStoragePlugin,
	JsonClientPlugin,
	ElectronBridgePlugin,
	RequirePlugin,
	CssVarPlugin,
	ScrollBarY_Plugin,
	ScrollBarX_Plugin,
	ScrollBarXY_Plugin,
];

const factories = {
	indexedDBFactory,
};

export { plugins, factories }