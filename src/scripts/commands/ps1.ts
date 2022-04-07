import { pinia } from "../../store";
import { useTerminalStore } from "../../store/terminal";

export default {
  action: (query: string, subcommand: string = "") => {
    const store = useTerminalStore(pinia);

    store.setPS1(query);
  },
  description: "Set the PS1",
  subcommands: {},
};
