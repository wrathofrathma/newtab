import { createPinia } from "pinia";
import { watch } from "vue";

const pinia = createPinia();

// Watch the state so we can persist it.
watch(
  pinia.state,
  (state) => {
    localStorage.setItem("piniaState", JSON.stringify(state));
  },
  { deep: true }
);

// The persisted state
const stateStorage = localStorage.getItem("piniaState");
const persistedState = stateStorage ? JSON.parse(stateStorage) : {};

export default pinia;

export { pinia, persistedState };
