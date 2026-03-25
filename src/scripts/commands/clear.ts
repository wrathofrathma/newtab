import { pinia } from "../../store";
import { useCategoryStore } from "../../store/category";
import { useTerminalStore } from "../../store/terminal";

const terminalStore = useTerminalStore(pinia);
const categoryStore = useCategoryStore(pinia);

const subcommands = {
  history: {
    action: () => {
      terminalStore.clearHistory();
    },
    description: "Clears command history",
  },
  all: {
    action: () => {
      terminalStore.clearHistory();
      categoryStore.resetToDefaults();
    },
    description: "Clears history and resets categories/links",
  },
};

export default {
  action: (query: string, subcommand: string = "") => {
    if (!subcommand) {
      return;
    }

    if (subcommand in subcommands) {
      subcommands[subcommand].action();
    }
  },
  description: "Clears stored history or all link data",
  subcommands,
};
