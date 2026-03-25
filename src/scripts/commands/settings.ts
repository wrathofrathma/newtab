import { pinia } from "../../store";
import { useUiStore } from "../../store/ui";

export default {
  action: (query: string, subcommand: string = "") => {
    const uiStore = useUiStore(pinia);
    uiStore.openSettings();
  },
  description: "Open settings menu",
  subcommands: {},
};
