import { defineStore } from "pinia";
import { persistedState } from "./index";

export const useTerminalStore = defineStore("terminal", {
  // other options...
  state: () => {
    return {
      PS1: persistedState.terminal?.PS1 ? persistedState.terminal.PS1 : ">",
      history: persistedState.terminal?.history
        ? persistedState.terminal.history
        : [],
      historySize: persistedState.terminal?.historySize
        ? persistedState.terminal.historySize
        : 1000,
      historyIndex: 0,
    };
  },
  getters: {
    next(state) {
      if (state.historyIndex === 0) {
        return { command: "", params: "" };
      }
      state.historyIndex--;
      return state.history[state.historyIndex];
    },
    prev(state) {
      if (state.historyIndex === state.history.length - 1) {
        return { command: "", params: "" };
      }
      state.historyIndex++;
      return state.history[state.historyIndex];
    },
  },
  actions: {
    setTerminal(settings) {
      this.PS1 = settings.PS1;
    },
    setPS1(PS1: string) {
      this.PS1 = PS1;
    },
    addCommand(command, params) {
      this.history.unshift({ command, params });
      if (this.history.length > this.historySize) {
        // TODO Should we change this to just take the slice of the last histSize number of elements?
        // Currently this would break if someone were to inject more history. It'd stay that size.
        this.history.pop();
      }
    },
  },
});
