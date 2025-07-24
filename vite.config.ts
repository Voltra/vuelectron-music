import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from "unplugin-auto-import/vite"
import { VueRouterAutoImports } from 'unplugin-vue-router'

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VueRouter({
			routesFolder: "./src/vue/pages",
			dts: "./src/vue/typed-router.d.ts",
			extendRoute(route) {
				// route.props = true;
				route.addToMeta({ props: true });
			},
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
		host: host || undefined,
		hmr: host ? {
			protocol: "ws",
			host,
			port: 1421,
		} : undefined,
		watch: {
			// tell vite to ignore watching `src-tauri`
			ignored: ['**/src-tauri/**'],
		},
	},
	// 3. to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ["VITE_", "TAURI_"],
	build: {
		// Tauri uses Chromium on Windows and WebKit on macOS and Linux
		target:
			process.env.TAURI_ENV_PLATFORM == 'windows'
				? 'chrome105'
				: 'safari13',
		// don't minify for debug builds
		minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_ENV_DEBUG,
	},
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
});
