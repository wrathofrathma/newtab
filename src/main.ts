import { createApp } from "vue";
// Tailwindcss
import "./index.css";
// vue-router setup
import router from "./router";
// pinia store setup
import { createPinia } from "pinia";

import App from "./App.vue";

createApp(App).use(router).use(createPinia()).mount("#app");
