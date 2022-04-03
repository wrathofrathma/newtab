import { createApp } from "vue";
// Tailwindcss
import "./index.css";
// vue-router setup
import router from "./router";
// pinia store setup
import pinia from "./store";

import App from "./App.vue";

createApp(App).use(router).use(pinia).mount("#app");
