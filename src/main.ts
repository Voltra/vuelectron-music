import { createApp } from "vue";
import "./styles.css";
import "./scss/styles.scss";
import App from "./App.vue";
import { pinia } from "@/vue/pinia";
import { router } from "@/vue/router";

const app = createApp(App)

app.use(pinia);
app.use(router);

app.mount("#app");
