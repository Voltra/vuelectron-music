import { createPinia } from "pinia";
import persistStatePlugin from "pinia-plugin-persistedstate";

const pinia = createPinia();

pinia.use(persistStatePlugin);

export {
	pinia,
}
