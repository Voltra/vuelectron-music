import "./polyfills";

import {createApp} from "vue";
import "./styles.css";
import "./scss/styles.scss";
import App from "./App.vue";
import {pinia} from "@/vue/pinia";
import {router} from "@/vue/router";
import {biLogger, setup} from "@/js/modules/tauri";

(async () => {
	biLogger.log("before");

	// await setup(async () => {
		const app = createApp(App)

		app.use(pinia);
		app.use(router);

		app.mount("#app");
	// });

	biLogger.log("after");
})();
