import { createApp } from "vue";
import { watch } from "vue";
// Tailwindcss
import "./index.css";
// vue-router setup
import router from "./router";
// pinia store setup
import pinia from "./store";
import { useSettingsStore } from "./store/settings";
import { applyTheme } from "./theme/applyTheme";

import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(pinia);

const settingsStore = useSettingsStore(pinia);

applyTheme(settingsStore.theme);

watch(
  () => settingsStore.theme,
  (theme) => {
    applyTheme(theme);
  },
);

app.mount("#app");
