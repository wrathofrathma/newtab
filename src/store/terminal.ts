import { defineStore } from "pinia";
import { persistedState } from "./index";
import {
  formatHistoryEntry,
  HistoryEntry,
  processRawInput,
} from "../scripts/terminal";

function uniqueHistoryEntries(history: HistoryEntry[]): HistoryEntry[] {
  const seen = new Set<string>();
  const unique: HistoryEntry[] = [];

  history.forEach((entry) => {
    const key = formatHistoryEntry(entry);

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    unique.push(entry);
  });

  return unique;
}

type TerminalState = {
  PS1: string;
  history: HistoryEntry[];
  historySize: number;
  historyCursor: number;
  historyDraftInput: string;
  rawInput: string;
};

export const useTerminalStore = defineStore("terminal", {
  state: (): TerminalState => {
    const persistedHistory = persistedState.terminal?.history;
    const normalizedHistory: HistoryEntry[] = Array.isArray(persistedHistory)
      ? persistedHistory
          .map((entry) => {
            return {
              command: typeof entry?.command === "string" ? entry.command : "",
              subcommand:
                typeof entry?.subcommand === "string" ? entry.subcommand : "",
              query: typeof entry?.query === "string" ? entry.query : "",
            };
          })
          .filter((entry) => entry.command || entry.query)
      : [];

    return {
      PS1: persistedState.terminal?.PS1 ? persistedState.terminal.PS1 : ">",
      history: normalizedHistory,
      historySize: persistedState.terminal?.historySize
        ? persistedState.terminal.historySize
        : 1000,
      historyCursor: -1,
      historyDraftInput: "",
      rawInput: "",
    };
  },
  actions: {
    setTerminal(settings: { PS1?: string }) {
      if (typeof settings.PS1 === "string") {
        this.PS1 = settings.PS1;
      }
    },
    setPS1(PS1: string) {
      this.PS1 = PS1;
    },
    setRawInput(rawInput: string) {
      this.rawInput = rawInput;
    },
    addCommand(command: string, subcommand: string, query: string) {
      this.history.unshift({ command, subcommand, query });

      if (this.history.length > this.historySize) {
        this.history = this.history.slice(0, this.historySize);
      }
    },
    historyPrev() {
      const history = uniqueHistoryEntries(this.history);

      if (history.length === 0) {
        return;
      }

      if (this.historyCursor === -1) {
        this.historyDraftInput = this.rawInput;
      }

      if (this.historyCursor < history.length - 1) {
        this.historyCursor += 1;
      }

      const entry = history[this.historyCursor];
      this.rawInput = entry ? formatHistoryEntry(entry) : this.rawInput;
    },
    historyNext() {
      const history = uniqueHistoryEntries(this.history);

      if (this.historyCursor === -1) {
        return;
      }

      if (this.historyCursor > 0) {
        this.historyCursor -= 1;
        this.rawInput = formatHistoryEntry(history[this.historyCursor]);
        return;
      }

      this.historyCursor = -1;
      this.rawInput = this.historyDraftInput;
      this.historyDraftInput = "";
    },
    resetHistoryCursor() {
      this.historyCursor = -1;
      this.historyDraftInput = "";
    },
    clearHistory() {
      this.history = [];
      this.resetHistoryCursor();
    },
    submitRawInput() {
      processRawInput(this.rawInput);
      this.rawInput = "";
      this.resetHistoryCursor();
    },
  },
});
