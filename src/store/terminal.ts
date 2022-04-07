import { defineStore } from "pinia";
import { persistedState } from "./index";
import { processCommand, parseCommand } from "../scripts/terminal";

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
      query: "",
      command: "",
      subcommand: "",
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
    addCommand(command, subcommand, params) {
      this.history.unshift({ command, subcommand, params });
      if (this.history.length > this.historySize) {
        // TODO Should we change this to just take the slice of the last histSize number of elements?
        // Currently this would break if someone were to inject more history. It'd stay that size.
        this.history.pop();
      }
    },
    backspace() {
      // This should work where
      // If there is any text in the query, we just don't do shit
      // If the selected text matches the full query, we're ctrl+a deleting everything
      // If the query is empty, and backspace again, we should back up into the subcommand, or if that's empty, the command.
      // We should first get the selected text.

      // This is a required two step process because typescript doesn't recognize window.getSelection as the same value if we call it twice.
      // so it throws possible null errors
      const rawSelection = window.getSelection();
      const selection = rawSelection ? rawSelection.toString() : "";

      // If the selection is exactly equal to our query string, then they did a select all. We should clear all.
      if (this.query && selection === this.query) {
        this.query = "";
        this.command = "";
        this.subcommand = "";
      }

      // Otherwise, we should start looking at backing up into the command / subcommand if the query length is 0
      if (this.query.length === 0 && this.subcommand) {
        this.query = " " + this.subcommand;
        this.subcommand = "";
      } else if (this.query.length === 0 && this.command) {
        this.query = this.command;
        this.command = "";
      }
    },
    submit() {
      // Remove the leading space between query & command / subcommand
      this.query = this.query.trimStart();
      processCommand(this.command, this.subcommand, this.query);
      this.command = "";
      this.query = "";
      this.subcommand = "";
      this.historyIndex = 0;
    },
  },
});
