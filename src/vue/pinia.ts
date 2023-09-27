import { createPinia } from "pinia";
import persistStatePlugin from "pinia-plugin-persistedstate";

const pinia = createPinia();

const plugins = [
	persistStatePlugin,
];

plugins.forEach(plugin => pinia.use(plugin));

export {
	pinia,
}
