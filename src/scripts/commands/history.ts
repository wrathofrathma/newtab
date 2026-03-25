import { pinia } from "../../store";
import { useUiStore } from "../../store/ui";

export default {
  action: (query: string, subcommand: string = "") => {
    const uiStore = useUiStore(pinia);
    uiStore.openHistory();
  },
  description: "View the command history",
  subcommands: {},
};
