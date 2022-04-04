import { defineStore } from "pinia";
import { persistedState } from "./index";

export const useTerminalStore = defineStore("terminal", {
  // other options...
  state: () => {
    return {
      PS1: persistedState.terminal?.PS1 ? persistedState.terminal.PS1 : ">",
    };
  },
  actions: {
    setTerminal(settings) {
      this.PS1 = settings.PS1;
    },
  },
});
