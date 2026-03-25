import { createPinia } from "pinia";
import { watch } from "vue";

const pinia = createPinia();

// Watch the state so we can persist it.
watch(
  pinia.state,
  (state) => {
    try {
      localStorage.setItem("piniaState", JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to persist pinia state", e);
    }
  },
  { deep: true },
);

// The persisted state
const stateStorage = localStorage.getItem("piniaState");
const persistedState = stateStorage ? JSON.parse(stateStorage) : {};

export default pinia;

export { pinia, persistedState };
