import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from "unplugin-auto-import/vite"
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig(async (env) => ({
	plugins: [
		VueRouter({
			routesFolder: "./src/vue/pages",
			dts: "./src/vue/typed-router.d.ts",
		}),
		Vue(),
		AutoImport({
			dts: true,
			eslintrc: {
				enabled: true,
			},
			imports: [
				"vue",
				VueRouterAutoImports,
			],
		}),
	],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
	},
	// 3. to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ["VITE_", "TAURI_"],

	css: {
		modules: {
			scopeBehaviour: "global",
		},
	},

	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
}));
